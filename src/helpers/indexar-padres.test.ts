import { describe, expect, it } from 'vitest';
import { indexarPadres } from './indexar-padres';

describe('indexarPadres', () => {
  it('asocia cada hijo con su padre', () => {
    const padres = indexarPadres(
      new Map([
        ['mecer', { zc: false, hijos: ['remecer'] }],
        ['facer', { abstracto: true, hijos: ['desfacer', 'satisfacer'] }],
      ]),
    );

    expect([...padres]).toEqual([
      ['remecer', 'mecer'],
      ['desfacer', 'facer'],
      ['satisfacer', 'facer'],
    ]);
  });

  it('exige que el hijo termine en su padre', () => {
    expect(() =>
      indexarPadres(new Map([['escribir', { hijos: ['inscribir'] }]])),
    ).toThrow('"inscribir" no termina en su padre "escribir"');
  });
});
