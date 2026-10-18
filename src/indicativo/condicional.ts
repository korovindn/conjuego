import { formar } from '../formar';
import { Ajustes, Celda, Clase, Forma, Paradigma } from '../types';

export const condicional = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma<Forma> => {
  const raizIrregular = ajustes.raices?.futuro;
  const forma = (terminacion: string) =>
    formar(
      raiz,
      clase,
      raizIrregular === undefined ? `${clase}${terminacion}` : terminacion,
      ajustes,
      raizIrregular,
    );

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
