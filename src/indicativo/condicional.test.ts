import { describe, expect, it } from 'vitest';
import { Celda, Clase } from '../types';
import { condicional } from './condicional';

describe('condicional de verbos regulares', () => {
  it.each([
    [
      'hablar',
      'habl',
      Clase.AR,
      {
        [Celda.PRIMERA_SINGULAR]: 'hablaría',
        [Celda.SEGUNDA_SINGULAR]: 'hablarías',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hablarías',
        [Celda.TERCERA_SINGULAR]: 'hablaría',
        [Celda.PRIMERA_PLURAL]: 'hablaríamos',
        [Celda.SEGUNDA_PLURAL]: 'hablaríais',
        [Celda.TERCERA_PLURAL]: 'hablarían',
      },
    ],
    [
      'comer',
      'com',
      Clase.ER,
      {
        [Celda.PRIMERA_SINGULAR]: 'comería',
        [Celda.SEGUNDA_SINGULAR]: 'comerías',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comerías',
        [Celda.TERCERA_SINGULAR]: 'comería',
        [Celda.PRIMERA_PLURAL]: 'comeríamos',
        [Celda.SEGUNDA_PLURAL]: 'comeríais',
        [Celda.TERCERA_PLURAL]: 'comerían',
      },
    ],
    [
      'vivir',
      'viv',
      Clase.IR,
      {
        [Celda.PRIMERA_SINGULAR]: 'viviría',
        [Celda.SEGUNDA_SINGULAR]: 'vivirías',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'vivirías',
        [Celda.TERCERA_SINGULAR]: 'viviría',
        [Celda.PRIMERA_PLURAL]: 'viviríamos',
        [Celda.SEGUNDA_PLURAL]: 'viviríais',
        [Celda.TERCERA_PLURAL]: 'vivirían',
      },
    ],
  ] as const)('conjuga %s', (_verbo, raiz, clase, esperado) => {
    expect(condicional(raiz, clase)).toEqual(esperado);
  });
});
