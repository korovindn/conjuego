import { mapearParadigma } from '../helpers';
import {
  Ajustes,
  Celda,
  Clase,
  Forma,
  Modo,
  SubjuntivoImperfectoVariant,
  Tabla,
  Tiempo,
} from '../types';
import { imperfecto } from './imperfecto';
import { presente } from './presente';

export const subjuntivo = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Tabla<Forma>[Modo.SUBJUNTIVO] => ({
  [Tiempo.PRESENTE]: presente(raiz, clase, ajustes),
  [Tiempo.IMPERFECTO]: {
    [SubjuntivoImperfectoVariant.RA]: imperfecto(
      raiz,
      clase,
      SubjuntivoImperfectoVariant.RA,
      ajustes,
    ),
    [SubjuntivoImperfectoVariant.SE]: imperfecto(
      raiz,
      clase,
      SubjuntivoImperfectoVariant.SE,
      ajustes,
    ),
  },
});

export const mapear = <F, G>(
  tabla: Tabla<F>[Modo.SUBJUNTIVO],
  mapeador: (
    forma: F,
    tiempo: Tiempo.PRESENTE | Tiempo.IMPERFECTO,
    celda: Celda,
    variant?: SubjuntivoImperfectoVariant,
  ) => G,
): Tabla<G>[Modo.SUBJUNTIVO] => {
  return {
    [Tiempo.PRESENTE]: mapearParadigma(tabla[Tiempo.PRESENTE], (forma, celda) =>
      mapeador(forma, Tiempo.PRESENTE, celda),
    ),
    [Tiempo.IMPERFECTO]: {
      [SubjuntivoImperfectoVariant.RA]: mapearParadigma(
        tabla[Tiempo.IMPERFECTO][SubjuntivoImperfectoVariant.RA],
        (forma, celda) =>
          mapeador(
            forma,
            Tiempo.IMPERFECTO,
            celda,
            SubjuntivoImperfectoVariant.RA,
          ),
      ),
      [SubjuntivoImperfectoVariant.SE]: mapearParadigma(
        tabla[Tiempo.IMPERFECTO][SubjuntivoImperfectoVariant.SE],
        (forma, celda) =>
          mapeador(
            forma,
            Tiempo.IMPERFECTO,
            celda,
            SubjuntivoImperfectoVariant.SE,
          ),
      ),
    },
  };
};
