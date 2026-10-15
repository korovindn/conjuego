import { parsearVerbo, normalizar } from './helpers';
import {
  Ajustes,
  Diccionario,
  Tabla,
  Modo,
  Tiempo,
  FORMA_NO_PERSONAL,
  FormaNoPersonal,
  Celda,
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
import { infinitivo, gerundio, participioPasado } from './no-personal';
import { PRONOMINAL } from './const';
import { agregarEnclitico } from './ortografia';

let d: Diccionario | undefined;

export const configurar = (diccionario: Diccionario) => {
  d = diccionario;
};

export const conjuego = (verbo: string): Tabla => {
  if (!d) {
    throw new Error('Diccionario no configurado');
  }

  const normalizado = normalizar(verbo);
  const [raiz, clase, pronominal] = parsearVerbo(normalizado);
  const entrada =
    d.get(normalizado) ??
    (pronominal ? d.get(normalizado.slice(0, -2)) : undefined);
  const ajustes: Ajustes = { zc: entrada?.zc };

  const indicativo: Tabla[Modo.INDICATIVO] = crearIndicativo(
    raiz,
    clase,
    ajustes,
  );
  const subjuntivo: Tabla[Modo.SUBJUNTIVO] = crearSubjuntivo(
    raiz,
    clase,
    ajustes,
  );
  const imperativo: Tabla[Modo.IMPERATIVO] = crearImperativo(
    raiz,
    clase,
    indicativo[Tiempo.PRESENTE],
    subjuntivo[Tiempo.PRESENTE],
    ajustes,
  );

  const aplicarPronominal = (forma: string, celda: Celda) =>
    pronominal ? `${PRONOMINAL[celda]} ${forma}` : forma;

  return {
    [Modo.INDICATIVO]: mapearIndicativo(indicativo, (forma, _tiempo, celda) =>
      aplicarPronominal(forma, celda),
    ),
    [Modo.SUBJUNTIVO]: mapearSubjuntivo(subjuntivo, (forma, _tiempo, celda) =>
      aplicarPronominal(forma, celda),
    ),
    [Modo.IMPERATIVO]: mapearImperativo(
      imperativo,
      (forma, polaridad, celda) =>
        pronominal && polaridad === Polaridad.AFIRMATIVA
          ? agregarEnclitico(forma, PRONOMINAL[celda])
          : aplicarPronominal(forma, celda),
    ),
    [FORMA_NO_PERSONAL]: {
      [FormaNoPersonal.INFINITIVO]: infinitivo(
        raiz,
        clase,
        pronominal,
        ajustes,
      ),
      [FormaNoPersonal.GERUNDIO]: gerundio(raiz, clase, pronominal, ajustes),
      [FormaNoPersonal.PARTICIPIO_PASADO]: participioPasado(
        raiz,
        clase,
        ajustes,
      ),
    },
  };
};
