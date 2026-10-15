import { ortografiarPorClase } from '../ortografia';
import { Ajustes, Celda, Clase, Paradigma } from '../types';

export const presente = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma => {
  const forma = ortografiarPorClase(raiz, clase, ajustes);

  return {
    [Celda.PRIMERA_SINGULAR]: forma('o', 'o', 'o'),
    [Celda.SEGUNDA_SINGULAR]: forma('as', 'es', 'es'),
    [Celda.SEGUNDA_SINGULAR_VOSEO]: forma('ás', 'és', 'ís'),
    [Celda.TERCERA_SINGULAR]: forma('a', 'e', 'e'),
    [Celda.PRIMERA_PLURAL]: forma('ámos', 'émos', 'ímos'),
    [Celda.SEGUNDA_PLURAL]: forma('áis', 'éis', 'ís'),
    [Celda.TERCERA_PLURAL]: forma('an', 'en', 'en'),
  };
};
