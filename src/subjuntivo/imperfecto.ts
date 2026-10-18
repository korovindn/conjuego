import {
  Ajustes,
  Clase,
  Forma,
  Paradigma,
  SubjuntivoImperfectoVariant,
} from '../types';
import { sobrePreterito } from './sobre-preterito';

export const imperfecto = (
  raiz: string,
  clase: Clase,
  variant: SubjuntivoImperfectoVariant,
  ajustes: Ajustes = {},
): Paradigma<Forma> => sobrePreterito(raiz, clase, variant, ajustes);
