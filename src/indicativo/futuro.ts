import { formar } from '../formar';
import { Ajustes, Celda, Clase, Paradigma } from '../types';

export const futuro = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma<string> => {
  const forma = (terminacion: string) =>
    formar(raiz, clase, `${clase}${terminacion}`, ajustes);

  return {
    [Celda.PRIMERA_SINGULAR]: forma('é'),
    [Celda.SEGUNDA_SINGULAR]: forma('ás'),
    [Celda.SEGUNDA_SINGULAR_VOSEO]: forma('ás'),
    [Celda.TERCERA_SINGULAR]: forma('á'),
    [Celda.PRIMERA_PLURAL]: forma('émos'),
    [Celda.SEGUNDA_PLURAL]: forma('éis'),
    [Celda.TERCERA_PLURAL]: forma('án'),
  };
};
