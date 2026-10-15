import { describe, expect, it } from 'vitest';
import { Celda, Clase } from '../types';
import { imperfecto } from './imperfecto';

describe('imperfecto de verbos regulares', () => {
  it.each([
    [
      'hablar',
      'habl',
      Clase.AR,
      {
        [Celda.PRIMERA_SINGULAR]: 'hablaba',
        [Celda.SEGUNDA_SINGULAR]: 'hablabas',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hablabas',
        [Celda.TERCERA_SINGULAR]: 'hablaba',
        [Celda.PRIMERA_PLURAL]: 'hablábamos',
        [Celda.SEGUNDA_PLURAL]: 'hablabais',
        [Celda.TERCERA_PLURAL]: 'hablaban',
      },
    ],
    [
      'comer',
      'com',
      Clase.ER,
      {
        [Celda.PRIMERA_SINGULAR]: 'comía',
        [Celda.SEGUNDA_SINGULAR]: 'comías',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comías',
        [Celda.TERCERA_SINGULAR]: 'comía',
        [Celda.PRIMERA_PLURAL]: 'comíamos',
        [Celda.SEGUNDA_PLURAL]: 'comíais',
        [Celda.TERCERA_PLURAL]: 'comían',
      },
    ],
    [
      'vivir',
      'viv',
      Clase.IR,
      {
        [Celda.PRIMERA_SINGULAR]: 'vivía',
        [Celda.SEGUNDA_SINGULAR]: 'vivías',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'vivías',
        [Celda.TERCERA_SINGULAR]: 'vivía',
        [Celda.PRIMERA_PLURAL]: 'vivíamos',
        [Celda.SEGUNDA_PLURAL]: 'vivíais',
        [Celda.TERCERA_PLURAL]: 'vivían',
      },
    ],
  ] as const)('conjuga %s', (_verbo, raiz, clase, esperado) => {
    expect(imperfecto(raiz, clase)).toEqual(esperado);
  });
});
