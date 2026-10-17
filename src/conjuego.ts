import { indexarPadres, parsearVerbo, normalizar } from './helpers';
import {
  Ajustes,
  Celda,
  Diccionario,
  Tabla,
  Modo,
  Tiempo,
  FORMA_NO_PERSONAL,
  FormaNoPersonal,
  Polaridad,
} from './types';
import {
  indicativo as crearIndicativo,
  mapear as mapearIndicativo,
} from './indicativo';
import {
  subjuntivo as crearSubjuntivo,
  mapear as mapearSubjuntivo,
} from './subjuntivo';
import {
  imperativo as crearImperativo,
  mapear as mapearImperativo,
} from './imperativo';
import {
  infinitivo,
  gerundio,
  participioPasado,
  mapear as mapearNoPersonal,
} from './no-personal';
import { prefijar, pronominalizar, pronominalizarNoPersonal } from './formar';

let d:
  | { diccionario: Diccionario; padres: ReadonlyMap<string, string> }
  | undefined;

export const configurar = (diccionario: Diccionario) => {
  d = { diccionario, padres: indexarPadres(diccionario) };
};

const mapearTabla = (
  tabla: Tabla<string>,
  personal: (forma: string, celda: Celda, polaridad?: Polaridad) => string,
  noPersonal: (forma: string, tipo: FormaNoPersonal) => string,
): Tabla<string> => ({
  [Modo.INDICATIVO]: mapearIndicativo(
    tabla[Modo.INDICATIVO],
    (forma, _tiempo, celda) => personal(forma, celda),
  ),
  [Modo.SUBJUNTIVO]: mapearSubjuntivo(
    tabla[Modo.SUBJUNTIVO],
    (forma, _tiempo, celda) => personal(forma, celda),
  ),
  [Modo.IMPERATIVO]: mapearImperativo(
    tabla[Modo.IMPERATIVO],
    (forma, polaridad, celda) => personal(forma, celda, polaridad),
  ),
  [FORMA_NO_PERSONAL]: mapearNoPersonal(tabla[FORMA_NO_PERSONAL], noPersonal),
});

const conjugar = (
  verbo: string,
  diccionario: Diccionario,
  padres: ReadonlyMap<string, string>,
): Tabla<string> => {
  const padre = padres.get(verbo);

  if (padre !== undefined) {
    const prefijo = verbo.slice(0, -padre.length);
    const conPrefijo = (forma: string) => prefijar(prefijo, forma);

    return mapearTabla(
      conjugar(padre, diccionario, padres),
      conPrefijo,
      conPrefijo,
    );
  }

  const [raiz, clase] = parsearVerbo(verbo);
  const ajustes: Ajustes = diccionario.get(verbo) ?? {};
  const indicativo = crearIndicativo(raiz, clase, ajustes);
  const subjuntivo = crearSubjuntivo(raiz, clase, ajustes);

  return {
    [Modo.INDICATIVO]: indicativo,
    [Modo.SUBJUNTIVO]: subjuntivo,
    [Modo.IMPERATIVO]: crearImperativo(
      raiz,
      clase,
      indicativo[Tiempo.PRESENTE],
      subjuntivo[Tiempo.PRESENTE],
      ajustes,
    ),
    [FORMA_NO_PERSONAL]: {
      [FormaNoPersonal.INFINITIVO]: infinitivo(raiz, clase, ajustes),
      [FormaNoPersonal.GERUNDIO]: gerundio(raiz, clase, ajustes),
      [FormaNoPersonal.PARTICIPIO_PASADO]: participioPasado(
        raiz,
        clase,
        ajustes,
      ),
    },
  };
};

export const conjuego = (verbo: string): Tabla => {
  if (!d) {
    throw new Error('Diccionario no configurado');
  }

  const normalizado = normalizar(verbo);
  const [, , pronominal] = parsearVerbo(normalizado);
  const tabla = conjugar(
    pronominal ? normalizado.slice(0, -2) : normalizado,
    d.diccionario,
    d.padres,
  );

  return pronominal
    ? mapearTabla(tabla, pronominalizar, pronominalizarNoPersonal)
    : tabla;
};
