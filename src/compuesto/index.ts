import { mapearForma, mapearParadigma } from '../helpers';
import {
  Casilla,
  FORMA_NO_PERSONAL,
  FormaNoPersonal,
  FormaNoPersonalCompuesta,
  Modo,
  Paradigma,
  SubjuntivoImperfectoVariant,
  Tabla,
  TablaInterna,
  Tiempo,
  TiempoCompuesto,
} from '../types';

const auxiliar = (casilla: Casilla): string | null =>
  casilla === null || typeof casilla === 'string' ? casilla : casilla[0];

export const componer = (haber: Casilla, participio: Casilla): Casilla => {
  const aux = auxiliar(haber);

  return aux === null
    ? null
    : mapearForma(participio, (forma) => `${aux} ${forma}`);
};

const componerParadigma = (haber: Paradigma, participio: Casilla): Paradigma =>
  mapearParadigma(haber, (casilla) => componer(casilla, participio));

export const enriquecer = (tabla: TablaInterna, haber: TablaInterna): Tabla => {
  const participio =
    tabla[FORMA_NO_PERSONAL][FormaNoPersonal.PARTICIPIO_PASADO];
  const indicativo = haber[Modo.INDICATIVO];
  const subjuntivo = haber[Modo.SUBJUNTIVO];
  const noPersonal = haber[FORMA_NO_PERSONAL];

  return {
    [Modo.INDICATIVO]: {
      ...tabla[Modo.INDICATIVO],
      [TiempoCompuesto.PERFECTO]: componerParadigma(
        indicativo[Tiempo.PRESENTE],
        participio,
      ),
      [TiempoCompuesto.PLUSCUAMPERFECTO]: componerParadigma(
        indicativo[Tiempo.IMPERFECTO],
        participio,
      ),
      [TiempoCompuesto.ANTERIOR]: componerParadigma(
        indicativo[Tiempo.PRETERITO],
        participio,
      ),
      [TiempoCompuesto.FUTURO_PERFECTO]: componerParadigma(
        indicativo[Tiempo.FUTURO],
        participio,
      ),
      [TiempoCompuesto.CONDICIONAL_PERFECTO]: componerParadigma(
        indicativo[Tiempo.CONDICIONAL],
        participio,
      ),
    },
    [Modo.SUBJUNTIVO]: {
      ...tabla[Modo.SUBJUNTIVO],
      [TiempoCompuesto.PERFECTO]: componerParadigma(
        subjuntivo[Tiempo.PRESENTE],
        participio,
      ),
      [TiempoCompuesto.PLUSCUAMPERFECTO]: {
        [SubjuntivoImperfectoVariant.RA]: componerParadigma(
          subjuntivo[Tiempo.IMPERFECTO][SubjuntivoImperfectoVariant.RA],
          participio,
        ),
        [SubjuntivoImperfectoVariant.SE]: componerParadigma(
          subjuntivo[Tiempo.IMPERFECTO][SubjuntivoImperfectoVariant.SE],
          participio,
        ),
      },
      [TiempoCompuesto.FUTURO_PERFECTO]: componerParadigma(
        subjuntivo[Tiempo.FUTURO],
        participio,
      ),
    },
    [Modo.IMPERATIVO]: tabla[Modo.IMPERATIVO],
    [FORMA_NO_PERSONAL]: {
      ...tabla[FORMA_NO_PERSONAL],
      [FormaNoPersonalCompuesta.INFINITIVO_COMPUESTO]: componer(
        noPersonal[FormaNoPersonal.INFINITIVO],
        participio,
      ),
      [FormaNoPersonalCompuesta.GERUNDIO_COMPUESTO]: componer(
        noPersonal[FormaNoPersonal.GERUNDIO],
        participio,
      ),
    },
  };
};
