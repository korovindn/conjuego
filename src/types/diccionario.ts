import { Alternancia } from './lengua';
import { Celda, Forma } from './tabla';

export interface Raices {
  presente?: Forma;
  subjuntivo?: Forma;
  preterito?: Forma;
  futuro?: Forma;
  imperfecto?: Forma;
}

export interface EntradaVerbo {
  infinitivo: string;
  abstracto?: true;
  como?: string;
  alternancia?: Alternancia;
  hiato?: boolean;
  zc?: false;
  raices?: Raices;
  imperativoTu?: Forma;
  participio?: Forma;
  gerundio?: Forma;
  formas?: Partial<Record<Celda, Forma>>;
}

export type Ajustes = Pick<EntradaVerbo, 'zc'>;

export type Diccionario = ReadonlyMap<string, EntradaVerbo>;
