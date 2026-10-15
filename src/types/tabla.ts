import {
  FORMA_NO_PERSONAL,
  FormaNoPersonal,
  Modo,
  Polaridad,
  Tiempo,
} from './lengua';

export enum Celda {
  /** yo */
  PRIMERA_SINGULAR = 'primera_singular',
  /** tú */
  SEGUNDA_SINGULAR = 'segunda_singular',
  /** vos */
  SEGUNDA_SINGULAR_VOSEO = 'segunda_singular_voseo',
  /** él/ella/usted */
  TERCERA_SINGULAR = 'tercera_singular',
  /** nosotros/nosotras */
  PRIMERA_PLURAL = 'primera_plural',
  /** vosotros/vosotras */
  SEGUNDA_PLURAL = 'segunda_plural',
  /** ellos/ellas/ustedes */
  TERCERA_PLURAL = 'tercera_plural',
}

export enum SubjuntivoImperfectoVariant {
  RA = 'ra',
  SE = 'se',
}
export type CeldaImperativo = Exclude<Celda, Celda.PRIMERA_SINGULAR>;

export type Forma = string; /* | [principal: string, ...variantes: string[]]*/

export type Paradigma = Record<Celda, Forma>;
export type ParadigmaImperativo = Record<CeldaImperativo, Forma>;

export interface Tabla {
  [Modo.INDICATIVO]: Record<Tiempo, Paradigma>;
  [Modo.SUBJUNTIVO]: {
    [Tiempo.PRESENTE]: Paradigma;
    [Tiempo.IMPERFECTO]: Record<SubjuntivoImperfectoVariant, Paradigma>;
  };
  [Modo.IMPERATIVO]: Record<Polaridad, ParadigmaImperativo>;
  [FORMA_NO_PERSONAL]: Record<FormaNoPersonal, Forma>;
}

export type Seis<T> = readonly [T, T, T, T, T, T];

export const SEIS: Seis<Exclude<Celda, Celda.SEGUNDA_SINGULAR_VOSEO>> = [
  Celda.PRIMERA_SINGULAR,
  Celda.SEGUNDA_SINGULAR,
  Celda.TERCERA_SINGULAR,
  Celda.PRIMERA_PLURAL,
  Celda.SEGUNDA_PLURAL,
  Celda.TERCERA_PLURAL,
];
