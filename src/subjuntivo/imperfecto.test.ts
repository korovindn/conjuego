import { describe, expect, it } from 'vitest';
import { Celda, Clase, SubjuntivoImperfectoVariant } from '../types';
import { imperfecto } from './imperfecto';

const { RA, SE } = SubjuntivoImperfectoVariant;

describe('imperfecto de subjuntivo de verbos regulares', () => {
  it.each([
    [
      'hablar -ra',
      'habl',
      Clase.AR,
      RA,
      {
        [Celda.PRIMERA_SINGULAR]: 'hablara',
        [Celda.SEGUNDA_SINGULAR]: 'hablaras',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hablaras',
        [Celda.TERCERA_SINGULAR]: 'hablara',
        [Celda.PRIMERA_PLURAL]: 'habláramos',
        [Celda.SEGUNDA_PLURAL]: 'hablarais',
        [Celda.TERCERA_PLURAL]: 'hablaran',
      },
    ],
    [
      'hablar -se',
      'habl',
      Clase.AR,
      SE,
      {
        [Celda.PRIMERA_SINGULAR]: 'hablase',
        [Celda.SEGUNDA_SINGULAR]: 'hablases',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hablases',
        [Celda.TERCERA_SINGULAR]: 'hablase',
        [Celda.PRIMERA_PLURAL]: 'hablásemos',
        [Celda.SEGUNDA_PLURAL]: 'hablaseis',
        [Celda.TERCERA_PLURAL]: 'hablasen',
      },
    ],
    [
      'comer -ra',
      'com',
      Clase.ER,
      RA,
      {
        [Celda.PRIMERA_SINGULAR]: 'comiera',
        [Celda.SEGUNDA_SINGULAR]: 'comieras',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comieras',
        [Celda.TERCERA_SINGULAR]: 'comiera',
        [Celda.PRIMERA_PLURAL]: 'comiéramos',
        [Celda.SEGUNDA_PLURAL]: 'comierais',
        [Celda.TERCERA_PLURAL]: 'comieran',
      },
    ],
    [
      'comer -se',
      'com',
      Clase.ER,
      SE,
      {
        [Celda.PRIMERA_SINGULAR]: 'comiese',
        [Celda.SEGUNDA_SINGULAR]: 'comieses',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comieses',
        [Celda.TERCERA_SINGULAR]: 'comiese',
        [Celda.PRIMERA_PLURAL]: 'comiésemos',
        [Celda.SEGUNDA_PLURAL]: 'comieseis',
        [Celda.TERCERA_PLURAL]: 'comiesen',
      },
    ],
    [
      'vivir -ra',
      'viv',
      Clase.IR,
      RA,
      {
        [Celda.PRIMERA_SINGULAR]: 'viviera',
        [Celda.SEGUNDA_SINGULAR]: 'vivieras',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'vivieras',
        [Celda.TERCERA_SINGULAR]: 'viviera',
        [Celda.PRIMERA_PLURAL]: 'viviéramos',
        [Celda.SEGUNDA_PLURAL]: 'vivierais',
        [Celda.TERCERA_PLURAL]: 'vivieran',
      },
    ],
    [
      'vivir -se',
      'viv',
      Clase.IR,
      SE,
      {
        [Celda.PRIMERA_SINGULAR]: 'viviese',
        [Celda.SEGUNDA_SINGULAR]: 'vivieses',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'vivieses',
        [Celda.TERCERA_SINGULAR]: 'viviese',
        [Celda.PRIMERA_PLURAL]: 'viviésemos',
        [Celda.SEGUNDA_PLURAL]: 'vivieseis',
        [Celda.TERCERA_PLURAL]: 'viviesen',
      },
    ],
  ] as const)('conjuga %s', (_verbo, raiz, clase, variant, esperado) => {
    expect(imperfecto(raiz, clase, variant)).toEqual(esperado);
  });
});
