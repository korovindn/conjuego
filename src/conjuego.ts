import {
  indexarPadres,
  mapearForma,
  parsearVerbo,
  normalizar,
} from './helpers';
import {
  Ajustes,
  Casilla,
  Celda,
  Diccionario,
  Formas,
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
  completarImperativo,
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
  tabla: Tabla,
  personal: (forma: string, celda: Celda, polaridad?: Polaridad) => string,
  noPersonal: (forma: string, tipo: FormaNoPersonal) => string,
): Tabla => ({
  [Modo.INDICATIVO]: mapearIndicativo(
    tabla[Modo.INDICATIVO],
    (casilla, _tiempo, celda) =>
      mapearForma(casilla, (forma) => personal(forma, celda)),
  ),
  [Modo.SUBJUNTIVO]: mapearSubjuntivo(
    tabla[Modo.SUBJUNTIVO],
    (casilla, _tiempo, celda) =>
      mapearForma(casilla, (forma) => personal(forma, celda)),
  ),
  [Modo.IMPERATIVO]: mapearImperativo(
    tabla[Modo.IMPERATIVO],
    (casilla, polaridad, celda) =>
      mapearForma(casilla, (forma) => personal(forma, celda, polaridad)),
  ),
  [FORMA_NO_PERSONAL]: mapearNoPersonal(
    tabla[FORMA_NO_PERSONAL],
    (casilla, tipo) => mapearForma(casilla, (forma) => noPersonal(forma, tipo)),
  ),
});

const elegir = (forma: Casilla | undefined, casilla: Casilla): Casilla =>
  forma === undefined ? casilla : forma;

export const aplicarFormas = (tabla: Tabla, formas: Formas): Tabla => ({
  [Modo.INDICATIVO]: mapearIndicativo(
    tabla[Modo.INDICATIVO],
    (casilla, tiempo, celda) =>
      elegir(formas[Modo.INDICATIVO]?.[tiempo]?.[celda], casilla),
  ),
  [Modo.SUBJUNTIVO]: mapearSubjuntivo(
    tabla[Modo.SUBJUNTIVO],
    (casilla, tiempo, celda, variant) =>
      elegir(
        tiempo === Tiempo.PRESENTE || variant === undefined
          ? formas[Modo.SUBJUNTIVO]?.[Tiempo.PRESENTE]?.[celda]
          : formas[Modo.SUBJUNTIVO]?.[Tiempo.IMPERFECTO]?.[variant]?.[celda],
        casilla,
      ),
  ),
  [Modo.IMPERATIVO]: mapearImperativo(
    tabla[Modo.IMPERATIVO],
    (casilla, polaridad, celda) =>
      elegir(formas[Modo.IMPERATIVO]?.[polaridad]?.[celda], casilla),
  ),
  [FORMA_NO_PERSONAL]: mapearNoPersonal(
    tabla[FORMA_NO_PERSONAL],
    (casilla, tipo) =>
      tipo === FormaNoPersonal.INFINITIVO
        ? casilla
        : elegir(formas[FORMA_NO_PERSONAL]?.[tipo], casilla),
  ),
});

const generar = (verbo: string, ajustes: Ajustes): Tabla => {
  const [raiz, clase] = parsearVerbo(verbo);
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

const heredar = (
  verbo: string,
  padre: string,
  diccionario: Diccionario,
  padres: ReadonlyMap<string, string>,
): Tabla => {
  const prefijo = verbo.slice(0, -padre.length);
  const conPrefijo = (forma: string) => prefijar(prefijo, forma);

  return mapearTabla(
    conjugar(padre, diccionario, padres),
    conPrefijo,
    conPrefijo,
  );
};

const conjugar = (
  verbo: string,
  diccionario: Diccionario,
  padres: ReadonlyMap<string, string>,
): Tabla => {
  const padre = padres.get(verbo);
  const entrada = diccionario.get(verbo) ?? {};
  const tabla =
    padre === undefined
      ? generar(verbo, entrada)
      : heredar(verbo, padre, diccionario, padres);

  return entrada.formas
    ? aplicarFormas(tabla, completarImperativo(entrada.formas))
    : tabla;
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
