import { mapearForma } from '../helpers';
import {
  Ajustes,
  Celda,
  Clase,
  Forma,
  Formas,
  Modo,
  Paradigma,
  SubjuntivoImperfectoVariant,
  Tiempo,
} from '../types';
import { sobrePreterito } from './sobre-preterito';

type Parcial = Partial<Paradigma>;

export const futuro = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Paradigma<Forma> => sobrePreterito(raiz, clase, 're', ajustes);

const deImperfecto = (forma: string) =>
  forma.replace(/ra(s|mos|is|n)?$/, 're$1');

const futuroDeImperfecto = (imperfecto: Parcial): Parcial =>
  Object.values(Celda).reduce<Parcial>((futuro, celda) => {
    const casilla = imperfecto[celda];

    return casilla === undefined
      ? futuro
      : { ...futuro, [celda]: mapearForma(casilla, deImperfecto) };
  }, {});

export const completarFuturo = (formas: Formas): Formas => {
  const subjuntivo = formas[Modo.SUBJUNTIVO];
  const imperfecto =
    subjuntivo?.[Tiempo.IMPERFECTO]?.[SubjuntivoImperfectoVariant.RA];

  if (subjuntivo === undefined || imperfecto === undefined) {
    return formas;
  }

  return {
    ...formas,
    [Modo.SUBJUNTIVO]: {
      ...subjuntivo,
      [Tiempo.FUTURO]: {
        ...futuroDeImperfecto(imperfecto),
        ...subjuntivo[Tiempo.FUTURO],
      },
    },
  };
};
