import { formarPorClase } from '../formar';
import { Ajustes, Celda, Clase, Forma, Paradigma } from '../types';

export const presente = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma<Forma> => {
  const forma = formarPorClase(raiz, clase, ajustes);
  const yo = formarPorClase(raiz, clase, ajustes, ajustes.raices?.presente);

  return {
    [Celda.PRIMERA_SINGULAR]: yo('o', 'o', 'o'),
    [Celda.SEGUNDA_SINGULAR]: forma('as', 'es', 'es'),
    [Celda.SEGUNDA_SINGULAR_VOSEO]: forma('ás', 'és', 'ís'),
    [Celda.TERCERA_SINGULAR]: forma('a', 'e', 'e'),
    [Celda.PRIMERA_PLURAL]: forma('ámos', 'émos', 'ímos'),
    [Celda.SEGUNDA_PLURAL]: forma('áis', 'éis', 'ís'),
    [Celda.TERCERA_PLURAL]: forma('an', 'en', 'en'),
  };
};
