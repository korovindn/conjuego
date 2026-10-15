import { describe, expect, it } from 'vitest';
import { Celda, Clase } from '../types';
import { futuro } from './futuro';

describe('futuro de verbos regulares', () => {
  it.each([
    [
      'hablar',
      'habl',
      Clase.AR,
      {
        [Celda.PRIMERA_SINGULAR]: 'hablaré',
        [Celda.SEGUNDA_SINGULAR]: 'hablarás',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hablarás',
        [Celda.TERCERA_SINGULAR]: 'hablará',
        [Celda.PRIMERA_PLURAL]: 'hablaremos',
        [Celda.SEGUNDA_PLURAL]: 'hablaréis',
        [Celda.TERCERA_PLURAL]: 'hablarán',
      },
    ],
    [
      'comer',
      'com',
      Clase.ER,
      {
        [Celda.PRIMERA_SINGULAR]: 'comeré',
        [Celda.SEGUNDA_SINGULAR]: 'comerás',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comerás',
        [Celda.TERCERA_SINGULAR]: 'comerá',
        [Celda.PRIMERA_PLURAL]: 'comeremos',
        [Celda.SEGUNDA_PLURAL]: 'comeréis',
        [Celda.TERCERA_PLURAL]: 'comerán',
      },
    ],
    [
      'vivir',
      'viv',
      Clase.IR,
      {
        [Celda.PRIMERA_SINGULAR]: 'viviré',
        [Celda.SEGUNDA_SINGULAR]: 'vivirás',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'vivirás',
        [Celda.TERCERA_SINGULAR]: 'vivirá',
        [Celda.PRIMERA_PLURAL]: 'viviremos',
        [Celda.SEGUNDA_PLURAL]: 'viviréis',
        [Celda.TERCERA_PLURAL]: 'vivirán',
      },
    ],
  ] as const)('conjuga %s', (_verbo, raiz, clase, esperado) => {
    expect(futuro(raiz, clase)).toEqual(esperado);
  });
});
