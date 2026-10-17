import { formarPorClase } from '../formar';
import { Ajustes, Celda, Clase, Paradigma } from '../types';

export const imperfecto = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma => {
  const forma = formarPorClase(raiz, clase, ajustes);

  return {
    [Celda.PRIMERA_SINGULAR]: forma('ába', 'ía', 'ía'),
    [Celda.SEGUNDA_SINGULAR]: forma('ábas', 'ías', 'ías'),
    [Celda.SEGUNDA_SINGULAR_VOSEO]: forma('ábas', 'ías', 'ías'),
    [Celda.TERCERA_SINGULAR]: forma('ába', 'ía', 'ía'),
    [Celda.PRIMERA_PLURAL]: forma('ábamos', 'íamos', 'íamos'),
    [Celda.SEGUNDA_PLURAL]: forma('ábais', 'íais', 'íais'),
    [Celda.TERCERA_PLURAL]: forma('ában', 'ían', 'ían'),
  };
};
