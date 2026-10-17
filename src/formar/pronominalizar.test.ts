import { describe, expect, it } from 'vitest';
import { Celda, FormaNoPersonal, Polaridad } from '../types';
import { pronominalizar, pronominalizarNoPersonal } from './pronominalizar';

describe('pronominalizar', () => {
  it('antepone el pronombre fuera del imperativo afirmativo', () => {
    expect(pronominalizar('lavo', Celda.PRIMERA_SINGULAR)).toBe('me lavo');
    expect(
      pronominalizar('lavéis', Celda.SEGUNDA_PLURAL, Polaridad.NEGATIVA),
    ).toBe('os lavéis');
  });

  it('pospone el pronombre en el imperativo afirmativo', () => {
    expect(
      pronominalizar('lava', Celda.SEGUNDA_SINGULAR, Polaridad.AFIRMATIVA),
    ).toBe('lávate');
  });
});

describe('pronominalizarNoPersonal', () => {
  it.each([
    [FormaNoPersonal.INFINITIVO, 'lavar', 'lavarse'],
    [FormaNoPersonal.GERUNDIO, 'lavando', 'lavándose'],
    [FormaNoPersonal.PARTICIPIO_PASADO, 'lavado', 'lavado'],
  ])('%s: %s → %s', (tipo, forma, esperada) => {
    expect(pronominalizarNoPersonal(forma, tipo)).toBe(esperada);
  });
});
