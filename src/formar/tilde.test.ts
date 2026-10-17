import { describe, expect, it } from 'vitest';
import { marcarTonica, resolverTilde } from './tilde';

describe('resolverTilde', () => {
  it.each([
    ['hablar', 'hablar'],
    ['hablár', 'hablar'],
    ['vivír', 'vivir'],
    ['hablámos', 'hablamos'],
    ['hablábamos', 'hablábamos'],
    ['habláis', 'habláis'],
    ['cómase', 'cómase'],
  ])('reglas generales: %s → %s', (marcada, esperado) => {
    expect(resolverTilde(marcada)).toBe(esperado);
  });

  it.each([
    ['reír', 'reír'],
    ['reímos', 'reímos'],
    ['reído', 'reído'],
    ['reíd', 'reíd'],
    ['reiré', 'reiré'],
    ['oír', 'oír'],
    ['leí', 'leí'],
    ['caído', 'caído'],
    ['envío', 'envío'],
    ['reúno', 'reúno'],
    ['prohíbo', 'prohíbo'],
  ])('hiato: %s → %s', (marcada, esperado) => {
    expect(resolverTilde(marcada)).toBe(esperado);
  });

  it.each([
    ['construímos', 'construimos'],
    ['construído', 'construido'],
    ['construí', 'construí'],
    ['cambio', 'cambio'],
    ['leyó', 'leyó'],
  ])('diptongo: %s → %s', (marcada, esperado) => {
    expect(resolverTilde(marcada)).toBe(esperado);
  });

  it.each([
    ['rió', 'rio'],
    ['fié', 'fie'],
    ['fiáis', 'fiais'],
    ['huí', 'hui'],
    ['huír', 'huir'],
  ])('monosílabo ortográfico: %s → %s', (marcada, esperado) => {
    expect(resolverTilde(marcada)).toBe(esperado);
  });

  it.each([
    ['busqué', 'busqué'],
    ['averigüé', 'averigüé'],
    ['estóy', 'estoy'],
  ])('u muda, diéresis e y final: %s → %s', (marcada, esperado) => {
    expect(resolverTilde(marcada)).toBe(esperado);
  });
});

describe('marcarTonica', () => {
  it.each([
    ['lava', 'láva'],
    ['hablan', 'háblan'],
    ['hablar', 'hablár'],
    ['comed', 'coméd'],
    ['cuido', 'cuído'],
    ['estoy', 'estóy'],
    ['rio', 'rió'],
    ['lavá', 'lavá'],
    ['lávate', 'lávate'],
  ])('%s → %s', (palabra, esperado) => {
    expect(marcarTonica(palabra)).toBe(esperado);
  });

  it.each([
    'hablo',
    'hablas',
    'hablamos',
    'habláis',
    'hablé',
    'hablaste',
    'habló',
    'hablaron',
    'hablaba',
    'hablábamos',
    'hablaré',
    'hablaréis',
    'hablaría',
    'hablaríais',
    'hable',
    'hablemos',
    'hablara',
    'hablásemos',
    'comí',
    'comieron',
    'comiésemos',
    'vivís',
    'vivid',
    'viviendo',
  ])('resolverTilde invierte marcarTonica en %s', (forma) => {
    expect(resolverTilde(marcarTonica(forma))).toBe(forma);
  });
});
