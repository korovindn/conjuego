import { formarPorClase } from '../formar';
import { Ajustes, Celda, Clase, Forma, Paradigma } from '../types';

export const presente = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma<Forma> => {
  const forma = formarPorClase(raiz, clase, ajustes, ajustes.raices?.presente);

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
