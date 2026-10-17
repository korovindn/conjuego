import { formarPorClase } from '../formar';
import { Ajustes, Celda, Clase, Paradigma } from '../types';

export const preterito = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma => {
  const forma = formarPorClase(raiz, clase, ajustes);

  return {
    [Celda.PRIMERA_SINGULAR]: forma('é', 'í', 'í'),
    [Celda.SEGUNDA_SINGULAR]: forma('áste', 'íste', 'íste'),
    [Celda.SEGUNDA_SINGULAR_VOSEO]: forma('áste', 'íste', 'íste'),
    [Celda.TERCERA_SINGULAR]: forma('ó', 'ió', 'ió'),
    [Celda.PRIMERA_PLURAL]: forma('ámos', 'ímos', 'ímos'),
    [Celda.SEGUNDA_PLURAL]: forma('ásteis', 'ísteis', 'ísteis'),
    [Celda.TERCERA_PLURAL]: forma('áron', 'iéron', 'iéron'),
  };
};
