import { porClase } from '../helpers';
import { formar } from '../formar';
import { Ajustes, Celda, Clase, Forma, Paradigma } from '../types';

export const sobrePreterito = (
  raiz: string,
  clase: Clase,
  sufijo: string,
  ajustes: Ajustes = {},
): Paradigma<Forma> => {
  const raizIrregular = ajustes.raices?.preterito;
  const tema =
    raizIrregular === undefined ? porClase('á', 'ié', 'ié')(clase) : 'ié';
  const forma = (persona: string) =>
    formar(raiz, clase, `${tema}${sufijo}${persona}`, ajustes, raizIrregular);

  return {
    [Celda.PRIMERA_SINGULAR]: forma(''),
    [Celda.SEGUNDA_SINGULAR]: forma('s'),
    [Celda.SEGUNDA_SINGULAR_VOSEO]: forma('s'),
    [Celda.TERCERA_SINGULAR]: forma(''),
    [Celda.PRIMERA_PLURAL]: forma('mos'),
    [Celda.SEGUNDA_PLURAL]: forma('is'),
    [Celda.TERCERA_PLURAL]: forma('n'),
  };
};
