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

export type Forma =
  | string
  | readonly [principal: string, ...variantes: string[]];

export type Casilla = Forma | null;

export type Paradigma<F = Casilla> = Record<Celda, F>;
export type ParadigmaImperativo<F = Casilla> = Record<CeldaImperativo, F>;

export interface Tabla<F = Casilla> {
  [Modo.INDICATIVO]: Record<Tiempo, Paradigma<F>>;
  [Modo.SUBJUNTIVO]: {
    [Tiempo.PRESENTE]: Paradigma<F>;
    [Tiempo.IMPERFECTO]: Record<SubjuntivoImperfectoVariant, Paradigma<F>>;
  };
  [Modo.IMPERATIVO]: Record<Polaridad, ParadigmaImperativo<F>>;
  [FORMA_NO_PERSONAL]: Record<FormaNoPersonal, F>;
}
