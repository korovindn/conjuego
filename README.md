# conjuego

Spanish verb conjugator. Tiny, typed, rule-based.

- **Any verb** — rules plus a small dictionary of irregulars, so neologisms work too (`googlear`, `tuitear`).
- **Complete** — every simple and compound tense, both imperfect subjunctive forms (-ra/-se), future subjunctive, affirmative and negative imperative, voseo, pronominal verbs (`lavarse` → `lávate`, `lavémonos`).
- **Accurate** — matches conjugate-esp on 99.8% of its 14,456 RAE verbs. Most remaining differences are errors on their side.
- **Small** — ~4 KB gzip engine + ~5 KB dictionary (conjugate-esp: ~66 KB).
- ESM + CJS, TypeScript types, no dependencies.

```sh
npm i conjuego
```

```ts
import { conjuego } from 'conjuego/por-defecto';

const tabla = conjuego('tener');

tabla.indicativo.presente.primera_singular; // 'tengo'
tabla.indicativo.presente.segunda_singular_voseo; // 'tenés'
tabla.subjuntivo.imperfecto.se.primera_plural; // 'tuviésemos'
tabla.imperativo.afirmativa.segunda_singular; // 'ten'
tabla.no_personal.gerundio; // 'teniendo'

conjuego('imprimir').no_personal.participio_pasado; // ['impreso', 'imprimido']
```

A cell is a string, or an array `[main, ...variants]` when several forms are correct. `principal()` always gives the main form as a string:

```ts
import { conjuego, principal } from 'conjuego/por-defecto';

const tabla = conjuego('condecir');

tabla.indicativo.futuro.primera_singular; // ['condeciré', 'condiré']
principal(tabla.indicativo.futuro.primera_singular); // 'condeciré'
```

To keep the dictionary in dynamic chunk or out of your bundle, import the bare engine and configure the dictionary:

```ts
import { configurar, conjuego } from 'conjuego';

const { default: diccionario } = await import('conjuego/dict/por_defecto.json');
// or const res = await fetch('https://your.cdn.with/dict.json');
configurar(new Map(Object.entries(await res.json())));
```

`conjuego()` throws until `configurar()` is called. The same call accepts your own dictionary.

## License

ISC
