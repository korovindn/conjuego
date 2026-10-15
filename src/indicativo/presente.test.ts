import { describe, expect, it } from 'vitest';
import { Celda, Clase } from '../types';
import { presente } from './presente';

describe('presente de verbos regulares', () => {
  it.each([
    [
      'hablar',
      'habl',
      Clase.AR,
      {
        [Celda.PRIMERA_SINGULAR]: 'hablo',
        [Celda.SEGUNDA_SINGULAR]: 'hablas',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hablás',
        [Celda.TERCERA_SINGULAR]: 'habla',
        [Celda.PRIMERA_PLURAL]: 'hablamos',
        [Celda.SEGUNDA_PLURAL]: 'habláis',
        [Celda.TERCERA_PLURAL]: 'hablan',
      },
    ],
    [
      'comer',
      'com',
      Clase.ER,
      {
        [Celda.PRIMERA_SINGULAR]: 'como',
        [Celda.SEGUNDA_SINGULAR]: 'comes',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comés',
        [Celda.TERCERA_SINGULAR]: 'come',
        [Celda.PRIMERA_PLURAL]: 'comemos',
        [Celda.SEGUNDA_PLURAL]: 'coméis',
        [Celda.TERCERA_PLURAL]: 'comen',
      },
    ],
    [
      'vivir',
      'viv',
      Clase.IR,
      {
        [Celda.PRIMERA_SINGULAR]: 'vivo',
        [Celda.SEGUNDA_SINGULAR]: 'vives',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'vivís',
        [Celda.TERCERA_SINGULAR]: 'vive',
        [Celda.PRIMERA_PLURAL]: 'vivimos',
        [Celda.SEGUNDA_PLURAL]: 'vivís',
        [Celda.TERCERA_PLURAL]: 'viven',
      },
    ],
  ] as const)('conjuga %s', (_verbo, raiz, clase, esperado) => {
    expect(presente(raiz, clase)).toEqual(esperado);
  });
});
