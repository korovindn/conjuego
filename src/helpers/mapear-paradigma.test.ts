import { describe, expect, it } from 'vitest';
import { Celda, Paradigma } from '../types';
import { mapearParadigma } from './mapear-paradigma';

const paradigma: Paradigma = {
  [Celda.PRIMERA_SINGULAR]: 'hablo',
  [Celda.SEGUNDA_SINGULAR]: 'hablas',
  [Celda.SEGUNDA_SINGULAR_VOSEO]: 'hablás',
  [Celda.TERCERA_SINGULAR]: 'habla',
  [Celda.PRIMERA_PLURAL]: 'hablamos',
  [Celda.SEGUNDA_PLURAL]: 'habláis',
  [Celda.TERCERA_PLURAL]: 'hablan',
};

describe('mapearParadigma', () => {
  it('transforma cada forma según su celda', () => {
    expect(
      mapearParadigma(paradigma, (forma, celda) => `${celda}:${forma}`),
    ).toEqual({
      [Celda.PRIMERA_SINGULAR]: 'primera_singular:hablo',
      [Celda.SEGUNDA_SINGULAR]: 'segunda_singular:hablas',
      [Celda.SEGUNDA_SINGULAR_VOSEO]: 'segunda_singular_voseo:hablás',
      [Celda.TERCERA_SINGULAR]: 'tercera_singular:habla',
      [Celda.PRIMERA_PLURAL]: 'primera_plural:hablamos',
      [Celda.SEGUNDA_PLURAL]: 'segunda_plural:habláis',
      [Celda.TERCERA_PLURAL]: 'tercera_plural:hablan',
    });
  });

  it('transforma solo las celdas presentes', () => {
    const paradigma = {
      [Celda.SEGUNDA_SINGULAR]: 'habla',
      [Celda.TERCERA_SINGULAR]: 'hable',
    };

    expect(
      mapearParadigma(paradigma, (forma, celda) => `${celda}:${forma}`),
    ).toEqual({
      [Celda.SEGUNDA_SINGULAR]: 'segunda_singular:habla',
      [Celda.TERCERA_SINGULAR]: 'tercera_singular:hable',
    });
  });

  it('conserva el paradigma original', () => {
    const original = { ...paradigma };

    const resultado = mapearParadigma(paradigma, (forma) =>
      forma.toUpperCase(),
    );

    expect(resultado).not.toBe(paradigma);
    expect(paradigma).toEqual(original);
  });
});
