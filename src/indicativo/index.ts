import { mapearParadigma } from '../helpers';
import { Ajustes, Celda, Clase, Forma, Modo, Tabla, Tiempo } from '../types';
import { condicional } from './condicional';
import { futuro } from './futuro';
import { imperfecto } from './imperfecto';
import { presente } from './presente';
import { preterito } from './preterito';

export const indicativo = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
): Tabla<Forma>[Modo.INDICATIVO] => ({
  [Tiempo.PRESENTE]: presente(raiz, clase, ajustes),
  [Tiempo.PRETERITO]: preterito(raiz, clase, ajustes),
  [Tiempo.IMPERFECTO]: imperfecto(raiz, clase, ajustes),
  [Tiempo.FUTURO]: futuro(raiz, clase, ajustes),
  [Tiempo.CONDICIONAL]: condicional(raiz, clase, ajustes),
});

export const mapear = <F, G>(
  tabla: Tabla<F>[Modo.INDICATIVO],
  mapeador: (forma: F, tiempo: Tiempo, celda: Celda) => G,
): Tabla<G>[Modo.INDICATIVO] => {
  return {
    [Tiempo.PRESENTE]: mapearParadigma(tabla[Tiempo.PRESENTE], (forma, celda) =>
      mapeador(forma, Tiempo.PRESENTE, celda),
    ),
    [Tiempo.PRETERITO]: mapearParadigma(
      tabla[Tiempo.PRETERITO],
      (forma, celda) => mapeador(forma, Tiempo.PRETERITO, celda),
    ),
    [Tiempo.IMPERFECTO]: mapearParadigma(
      tabla[Tiempo.IMPERFECTO],
      (forma, celda) => mapeador(forma, Tiempo.IMPERFECTO, celda),
    ),
    [Tiempo.FUTURO]: mapearParadigma(tabla[Tiempo.FUTURO], (forma, celda) =>
      mapeador(forma, Tiempo.FUTURO, celda),
    ),
    [Tiempo.CONDICIONAL]: mapearParadigma(
      tabla[Tiempo.CONDICIONAL],
      (forma, celda) => mapeador(forma, Tiempo.CONDICIONAL, celda),
    ),
  };
};
