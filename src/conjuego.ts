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
  TablaInterna,
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
  completarFuturo,
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
import { enriquecer } from './compuesto';

let d:
  | {
      diccionario: Diccionario;
      padres: ReadonlyMap<string, string>;
      haber: { simple: TablaInterna; pronominal: TablaInterna };
    }
  | undefined;

export const configurar = (diccionario: Diccionario) => {
  const padres = indexarPadres(diccionario);
  const haber = conjugar('haber', diccionario, padres);

  d = {
    diccionario,
    padres,
    haber: {
      simple: haber,
      pronominal: mapearTabla(haber, pronominalizar, pronominalizarNoPersonal),
    },
  };
};

const mapearTabla = (
  tabla: TablaInterna,
  personal: (forma: string, celda: Celda, polaridad?: Polaridad) => string,
  noPersonal: (forma: string, tipo: FormaNoPersonal) => string,
): TablaInterna => ({
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

export const aplicarFormas = (
  tabla: TablaInterna,
  formas: Formas,
): TablaInterna => ({
  [Modo.INDICATIVO]: mapearIndicativo(
    tabla[Modo.INDICATIVO],
    (casilla, tiempo, celda) =>
      elegir(formas[Modo.INDICATIVO]?.[tiempo]?.[celda], casilla),
  ),
  [Modo.SUBJUNTIVO]: mapearSubjuntivo(
    tabla[Modo.SUBJUNTIVO],
    (casilla, tiempo, celda, variant) =>
      elegir(
        tiempo === Tiempo.IMPERFECTO
          ? variant && formas[Modo.SUBJUNTIVO]?.[tiempo]?.[variant]?.[celda]
          : formas[Modo.SUBJUNTIVO]?.[tiempo]?.[celda],
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

const generar = (verbo: string, ajustes: Ajustes): TablaInterna => {
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
): TablaInterna => {
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
): TablaInterna => {
  const padre = padres.get(verbo);
  const entrada = diccionario.get(verbo) ?? {};
  const tabla =
    padre === undefined
      ? generar(verbo, entrada)
      : heredar(verbo, padre, diccionario, padres);

  return entrada.formas
    ? aplicarFormas(tabla, completarImperativo(completarFuturo(entrada.formas)))
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
    ? enriquecer(
        mapearTabla(tabla, pronominalizar, pronominalizarNoPersonal),
        d.haber.pronominal,
      )
    : enriquecer(tabla, d.haber.simple);
};
