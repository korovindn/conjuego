import { Alternancia, FORMA_NO_PERSONAL, FormaNoPersonal } from './lengua';
import { Casilla, Forma, Tabla } from './tabla';

export interface Raices {
  /** primera persona del presente y todo el presente de subjuntivo */
  presente?: Forma;
  /** pretérito y subjuntivo imperfecto */
  preterito?: Forma;
  /** futuro y condicional */
  futuro?: Forma;
}

type Parcial<T> = {
  [K in keyof T]?: T[K] extends Casilla ? T[K] : Parcial<T[K]>;
};

export type Formas = Parcial<
  Omit<Tabla, typeof FORMA_NO_PERSONAL> & {
    [FORMA_NO_PERSONAL]: Omit<
      Tabla[typeof FORMA_NO_PERSONAL],
      FormaNoPersonal.INFINITIVO
    >;
  }
>;

export interface EntradaVerbo {
  /** no es un verbo real, parte común de verbos similares */
  abstracto?: true;
  /** verbos similares */
  hijos?: string[];
  alternancia?: Alternancia;
  hiato?: boolean;
  zc?: false;
  raices?: Raices;
  /** formas completamente irregulares */
  formas?: Formas;
}

export type Ajustes = Pick<EntradaVerbo, 'zc' | 'alternancia' | 'hiato'>;

export type Diccionario = ReadonlyMap<string, EntradaVerbo>;
