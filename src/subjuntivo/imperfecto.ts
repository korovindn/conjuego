import { porClase } from '../helpers';
import { formar } from '../formar';
import {
  Ajustes,
  Celda,
  Clase,
  Paradigma,
  SubjuntivoImperfectoVariant,
} from '../types';

export const imperfecto = (
  raiz: string,
  clase: Clase,
  variant: SubjuntivoImperfectoVariant,
  ajustes: Ajustes = {},
): Paradigma => {
  const tema = porClase('á', 'ié', 'ié')(clase);
  const forma = (persona: string) =>
    formar(raiz, clase, `${tema}${variant}${persona}`, ajustes);

  return {
    [Celda.PRIMERA_SINGULAR]: forma(''),
    [Celda.SEGUNDA_SINGULAR]: forma('s'),
    [Celda.SEGUNDA_SINGULAR_VOSEO]: forma('s'),
    [Celda.TERCERA_SINGULAR]: forma(''),
    [Celda.PRIMERA_PLURAL]: forma('mos'),
    [Celda.SEGUNDA_PLURAL]: forma('is'),
    [Celda.TERCERA_PLURAL]: forma('n'),
  };
};
