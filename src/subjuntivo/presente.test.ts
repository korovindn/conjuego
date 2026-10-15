import { describe, expect, it } from 'vitest';
import { Celda, Clase } from '../types';
import { presente } from './presente';

describe('presente de subjuntivo de verbos regulares', () => {
  it.each([
    [
      'hablar',
      'habl',
      Clase.AR,
      {
        [Celda.PRIMERA_SINGULAR]: 'hable',
        [Celda.SEGUNDA_SINGULAR]: 'hables',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hables',
        [Celda.TERCERA_SINGULAR]: 'hable',
        [Celda.PRIMERA_PLURAL]: 'hablemos',
        [Celda.SEGUNDA_PLURAL]: 'habléis',
        [Celda.TERCERA_PLURAL]: 'hablen',
      },
    ],
    [
      'comer',
      'com',
      Clase.ER,
      {
        [Celda.PRIMERA_SINGULAR]: 'coma',
        [Celda.SEGUNDA_SINGULAR]: 'comas',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comas',
        [Celda.TERCERA_SINGULAR]: 'coma',
        [Celda.PRIMERA_PLURAL]: 'comamos',
        [Celda.SEGUNDA_PLURAL]: 'comáis',
        [Celda.TERCERA_PLURAL]: 'coman',
      },
    ],
    [
      'vivir',
      'viv',
      Clase.IR,
      {
        [Celda.PRIMERA_SINGULAR]: 'viva',
        [Celda.SEGUNDA_SINGULAR]: 'vivas',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'vivas',
        [Celda.TERCERA_SINGULAR]: 'viva',
        [Celda.PRIMERA_PLURAL]: 'vivamos',
        [Celda.SEGUNDA_PLURAL]: 'viváis',
        [Celda.TERCERA_PLURAL]: 'vivan',
      },
    ],
  ] as const)('conjuga %s', (_verbo, raiz, clase, esperado) => {
    expect(presente(raiz, clase)).toEqual(esperado);
  });
});
