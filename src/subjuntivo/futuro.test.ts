import { describe, expect, it } from 'vitest';
import {
  Celda,
  Clase,
  Modo,
  SubjuntivoImperfectoVariant,
  Tiempo,
} from '../types';
import { completarFuturo, futuro } from './futuro';

const { RA, SE } = SubjuntivoImperfectoVariant;

describe('futuro de subjuntivo', () => {
  it.each([
    [
      'hablar',
      'habl',
      Clase.AR,
      {},
      {
        [Celda.PRIMERA_SINGULAR]: 'hablare',
        [Celda.SEGUNDA_SINGULAR]: 'hablares',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hablares',
        [Celda.TERCERA_SINGULAR]: 'hablare',
        [Celda.PRIMERA_PLURAL]: 'habláremos',
        [Celda.SEGUNDA_PLURAL]: 'hablareis',
        [Celda.TERCERA_PLURAL]: 'hablaren',
      },
    ],
    [
      'comer',
      'com',
      Clase.ER,
      {},
      {
        [Celda.PRIMERA_SINGULAR]: 'comiere',
        [Celda.SEGUNDA_SINGULAR]: 'comieres',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comieres',
        [Celda.TERCERA_SINGULAR]: 'comiere',
        [Celda.PRIMERA_PLURAL]: 'comiéremos',
        [Celda.SEGUNDA_PLURAL]: 'comiereis',
        [Celda.TERCERA_PLURAL]: 'comieren',
      },
    ],
    [
      'vivir',
      'viv',
      Clase.IR,
      {},
      {
        [Celda.PRIMERA_SINGULAR]: 'viviere',
        [Celda.SEGUNDA_SINGULAR]: 'vivieres',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'vivieres',
        [Celda.TERCERA_SINGULAR]: 'viviere',
        [Celda.PRIMERA_PLURAL]: 'viviéremos',
        [Celda.SEGUNDA_PLURAL]: 'viviereis',
        [Celda.TERCERA_PLURAL]: 'vivieren',
      },
    ],
    [
      'tener',
      'ten',
      Clase.ER,
      { raices: { preterito: 'tuv' } },
      {
        [Celda.PRIMERA_SINGULAR]: 'tuviere',
        [Celda.SEGUNDA_SINGULAR]: 'tuvieres',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'tuvieres',
        [Celda.TERCERA_SINGULAR]: 'tuviere',
        [Celda.PRIMERA_PLURAL]: 'tuviéremos',
        [Celda.SEGUNDA_PLURAL]: 'tuviereis',
        [Celda.TERCERA_PLURAL]: 'tuvieren',
      },
    ],
  ] as const)('conjuga %s', (_verbo, raiz, clase, ajustes, esperado) => {
    expect(futuro(raiz, clase, ajustes)).toEqual(esperado);
  });
});

describe('completarFuturo', () => {
  it('deriva el futuro del imperfecto en -ra', () => {
    const formas = completarFuturo({
      [Modo.SUBJUNTIVO]: {
        [Tiempo.IMPERFECTO]: {
          [RA]: {
            [Celda.PRIMERA_SINGULAR]: 'fuera',
            [Celda.SEGUNDA_SINGULAR]: 'fueras',
            [Celda.TERCERA_SINGULAR]: ['placiera', 'pluguiera'],
            [Celda.PRIMERA_PLURAL]: 'fuéramos',
            [Celda.SEGUNDA_PLURAL]: 'fuerais',
            [Celda.TERCERA_PLURAL]: null,
          },
          [SE]: { [Celda.PRIMERA_SINGULAR]: 'fuese' },
        },
      },
    });

    expect(formas[Modo.SUBJUNTIVO]?.[Tiempo.FUTURO]).toEqual({
      [Celda.PRIMERA_SINGULAR]: 'fuere',
      [Celda.SEGUNDA_SINGULAR]: 'fueres',
      [Celda.TERCERA_SINGULAR]: ['placiere', 'pluguiere'],
      [Celda.PRIMERA_PLURAL]: 'fuéremos',
      [Celda.SEGUNDA_PLURAL]: 'fuereis',
      [Celda.TERCERA_PLURAL]: null,
    });
  });

  it('respeta el futuro explícito', () => {
    const formas = completarFuturo({
      [Modo.SUBJUNTIVO]: {
        [Tiempo.IMPERFECTO]: { [RA]: { [Celda.PRIMERA_SINGULAR]: 'fuera' } },
        [Tiempo.FUTURO]: { [Celda.PRIMERA_SINGULAR]: null },
      },
    });

    expect(formas[Modo.SUBJUNTIVO]?.[Tiempo.FUTURO]).toEqual({
      [Celda.PRIMERA_SINGULAR]: null,
    });
  });

  it('sin imperfecto en -ra no cambia nada', () => {
    const formas = {
      [Modo.SUBJUNTIVO]: {
        [Tiempo.PRESENTE]: { [Celda.PRIMERA_SINGULAR]: 'dé' },
      },
    };

    expect(completarFuturo(formas)).toBe(formas);
  });
});
