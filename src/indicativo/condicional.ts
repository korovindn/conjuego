import { formar } from '../formar';
import { Ajustes, Celda, Clase, Paradigma } from '../types';

export const condicional = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma<string> => {
  const forma = (terminacion: string) =>
    formar(raiz, clase, `${clase}${terminacion}`, ajustes);

  return {
    [Celda.PRIMERA_SINGULAR]: forma('ía'),
    [Celda.SEGUNDA_SINGULAR]: forma('ías'),
    [Celda.SEGUNDA_SINGULAR_VOSEO]: forma('ías'),
    [Celda.TERCERA_SINGULAR]: forma('ía'),
    [Celda.PRIMERA_PLURAL]: forma('íamos'),
    [Celda.SEGUNDA_PLURAL]: forma('íais'),
    [Celda.TERCERA_PLURAL]: forma('ían'),
  };
};
