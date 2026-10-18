import { describe, expect, it } from 'vitest';
import { presente as presenteIndicativo } from '../indicativo/presente';
import { presente as presenteSubjuntivo } from '../subjuntivo/presente';
import { Celda, Clase, Modo, Polaridad, Tiempo } from '../types';
import { completarImperativo, imperativo } from './index';

describe('imperativo de verbos regulares', () => {
  it.each([
    [
      'hablar',
      'habl',
      Clase.AR,
      {
        [Polaridad.AFIRMATIVA]: {
          [Celda.SEGUNDA_SINGULAR]: 'habla',
          [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hablá',
          [Celda.TERCERA_SINGULAR]: 'hable',
          [Celda.PRIMERA_PLURAL]: 'hablemos',
          [Celda.SEGUNDA_PLURAL]: 'hablad',
          [Celda.TERCERA_PLURAL]: 'hablen',
        },
        [Polaridad.NEGATIVA]: {
          [Celda.SEGUNDA_SINGULAR]: 'hables',
          [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hables',
          [Celda.TERCERA_SINGULAR]: 'hable',
          [Celda.PRIMERA_PLURAL]: 'hablemos',
          [Celda.SEGUNDA_PLURAL]: 'habléis',
          [Celda.TERCERA_PLURAL]: 'hablen',
        },
      },
    ],
    [
      'comer',
      'com',
      Clase.ER,
      {
        [Polaridad.AFIRMATIVA]: {
          [Celda.SEGUNDA_SINGULAR]: 'come',
          [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comé',
          [Celda.TERCERA_SINGULAR]: 'coma',
          [Celda.PRIMERA_PLURAL]: 'comamos',
          [Celda.SEGUNDA_PLURAL]: 'comed',
          [Celda.TERCERA_PLURAL]: 'coman',
        },
        [Polaridad.NEGATIVA]: {
          [Celda.SEGUNDA_SINGULAR]: 'comas',
          [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comas',
          [Celda.TERCERA_SINGULAR]: 'coma',
          [Celda.PRIMERA_PLURAL]: 'comamos',
          [Celda.SEGUNDA_PLURAL]: 'comáis',
          [Celda.TERCERA_PLURAL]: 'coman',
        },
      },
    ],
    [
      'vivir',
      'viv',
      Clase.IR,
      {
        [Polaridad.AFIRMATIVA]: {
          [Celda.SEGUNDA_SINGULAR]: 'vive',
          [Celda.SEGUNDA_SINGULAR_VOSEO]: 'viví',
          [Celda.TERCERA_SINGULAR]: 'viva',
          [Celda.PRIMERA_PLURAL]: 'vivamos',
          [Celda.SEGUNDA_PLURAL]: 'vivid',
          [Celda.TERCERA_PLURAL]: 'vivan',
        },
        [Polaridad.NEGATIVA]: {
          [Celda.SEGUNDA_SINGULAR]: 'vivas',
          [Celda.SEGUNDA_SINGULAR_VOSEO]: 'vivas',
          [Celda.TERCERA_SINGULAR]: 'viva',
          [Celda.PRIMERA_PLURAL]: 'vivamos',
          [Celda.SEGUNDA_PLURAL]: 'viváis',
          [Celda.TERCERA_PLURAL]: 'vivan',
        },
      },
    ],
  ] as const)('conjuga %s', (_verbo, raiz, clase, esperado) => {
    expect(
      imperativo(
        raiz,
        clase,
        presenteIndicativo(raiz, clase),
        presenteSubjuntivo(raiz, clase),
      ),
    ).toEqual(esperado);
  });
});

describe('completarImperativo', () => {
  it('extiende el subjuntivo y el indicativo del presente', () => {
    expect(
      completarImperativo({
        [Modo.INDICATIVO]: {
          [Tiempo.PRESENTE]: { [Celda.SEGUNDA_SINGULAR]: ['oyes', 'oís'] },
        },
        [Modo.SUBJUNTIVO]: {
          [Tiempo.PRESENTE]: {
            [Celda.PRIMERA_SINGULAR]: 'dé',
            [Celda.SEGUNDA_SINGULAR]: 'des',
            [Celda.SEGUNDA_PLURAL]: 'deis',
            [Celda.TERCERA_SINGULAR]: 'dé',
          },
        },
      })[Modo.IMPERATIVO],
    ).toEqual({
      [Polaridad.AFIRMATIVA]: {
        [Celda.SEGUNDA_SINGULAR]: ['oye', 'oí'],
        [Celda.TERCERA_SINGULAR]: 'dé',
      },
      [Polaridad.NEGATIVA]: {
        [Celda.SEGUNDA_SINGULAR]: 'des',
        [Celda.SEGUNDA_PLURAL]: 'deis',
        [Celda.TERCERA_SINGULAR]: 'dé',
      },
    });
  });

  it('el imperativo explícito tiene prioridad', () => {
    expect(
      completarImperativo({
        [Modo.INDICATIVO]: {
          [Tiempo.PRESENTE]: {
            [Celda.SEGUNDA_SINGULAR]: 'eres',
            [Celda.SEGUNDA_SINGULAR_VOSEO]: null,
          },
        },
        [Modo.IMPERATIVO]: {
          [Polaridad.AFIRMATIVA]: { [Celda.SEGUNDA_SINGULAR]: 'sé' },
        },
      })[Modo.IMPERATIVO],
    ).toEqual({
      [Polaridad.AFIRMATIVA]: {
        [Celda.SEGUNDA_SINGULAR]: 'sé',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: null,
      },
      [Polaridad.NEGATIVA]: {},
    });
  });
});
