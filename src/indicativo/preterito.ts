import { formar, formarPorClase } from '../formar';
import { Ajustes, Celda, Clase, Forma, Paradigma } from '../types';

export const preterito = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma<Forma> => {
  const raizIrregular = ajustes.raices?.preterito;

  if (raizIrregular !== undefined) {
    const forma = (desinencia: string) =>
      formar(raiz, clase, desinencia, ajustes, raizIrregular);

    return {
      [Celda.PRIMERA_SINGULAR]: forma('e'),
      [Celda.SEGUNDA_SINGULAR]: forma('íste'),
      [Celda.SEGUNDA_SINGULAR_VOSEO]: forma('íste'),
      [Celda.TERCERA_SINGULAR]: forma('o'),
      [Celda.PRIMERA_PLURAL]: forma('ímos'),
      [Celda.SEGUNDA_PLURAL]: forma('ísteis'),
      [Celda.TERCERA_PLURAL]: forma('iéron'),
    };
  }

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
