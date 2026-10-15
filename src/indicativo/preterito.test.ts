import { describe, expect, it } from 'vitest';
import { Celda, Clase } from '../types';
import { preterito } from './preterito';

describe('preterito de verbos regulares', () => {
  it.each([
    [
      'hablar',
      'habl',
      Clase.AR,
      {
        [Celda.PRIMERA_SINGULAR]: 'hablé',
        [Celda.SEGUNDA_SINGULAR]: 'hablaste',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hablaste',
        [Celda.TERCERA_SINGULAR]: 'habló',
        [Celda.PRIMERA_PLURAL]: 'hablamos',
        [Celda.SEGUNDA_PLURAL]: 'hablasteis',
        [Celda.TERCERA_PLURAL]: 'hablaron',
      },
    ],
    [
      'comer',
      'com',
      Clase.ER,
      {
        [Celda.PRIMERA_SINGULAR]: 'comí',
        [Celda.SEGUNDA_SINGULAR]: 'comiste',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comiste',
        [Celda.TERCERA_SINGULAR]: 'comió',
        [Celda.PRIMERA_PLURAL]: 'comimos',
        [Celda.SEGUNDA_PLURAL]: 'comisteis',
        [Celda.TERCERA_PLURAL]: 'comieron',
      },
    ],
    [
      'vivir',
      'viv',
      Clase.IR,
      {
        [Celda.PRIMERA_SINGULAR]: 'viví',
        [Celda.SEGUNDA_SINGULAR]: 'viviste',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'viviste',
        [Celda.TERCERA_SINGULAR]: 'vivió',
        [Celda.PRIMERA_PLURAL]: 'vivimos',
        [Celda.SEGUNDA_PLURAL]: 'vivisteis',
        [Celda.TERCERA_PLURAL]: 'vivieron',
      },
    ],
  ] as const)('conjuga %s', (_verbo, raiz, clase, esperado) => {
    expect(preterito(raiz, clase)).toEqual(esperado);
  });
});
