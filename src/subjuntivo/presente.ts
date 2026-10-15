import { ortografiarPorClase } from '../ortografia';
import { Ajustes, Celda, Clase, Paradigma } from '../types';

export const presente = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma => {
  const forma = ortografiarPorClase(raiz, clase, ajustes);

  return {
    [Celda.PRIMERA_SINGULAR]: forma('e', 'a', 'a'),
    [Celda.SEGUNDA_SINGULAR]: forma('es', 'as', 'as'),
    [Celda.SEGUNDA_SINGULAR_VOSEO]: forma('es', 'as', 'as'),
    [Celda.TERCERA_SINGULAR]: forma('e', 'a', 'a'),
    [Celda.PRIMERA_PLURAL]: forma('émos', 'ámos', 'ámos'),
    [Celda.SEGUNDA_PLURAL]: forma('éis', 'áis', 'áis'),
    [Celda.TERCERA_PLURAL]: forma('en', 'an', 'an'),
  };
};
