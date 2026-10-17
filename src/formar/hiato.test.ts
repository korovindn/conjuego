import { describe, expect, it } from 'vitest';
import { acentuarHiato } from './hiato';

describe('acentuarHiato', () => {
  it.each([
    ['envi', 'o'],
    ['reun', 'e'],
  ])('sin hiato no cambia: %s + %s', (raiz, desinencia) => {
    expect(acentuarHiato(raiz, desinencia)).toBe(raiz);
  });

  it.each([
    ['envi', 'ámos'],
    ['envi', 'ás'],
    ['envi', 'ád'],
    ['envi', 'ándo'],
    ['envi', 'é'],
    ['reun', 'ímos'],
    ['reun', 'ió'],
  ])('desinencia tónica no cambia: %s + %s', (raiz, desinencia) => {
    expect(acentuarHiato(raiz, desinencia, true)).toBe(raiz);
  });

  it.each([
    ['envi', 'o', 'enví'],
    ['envi', 'as', 'enví'],
    ['actu', 'e', 'actú'],
    ['actu', 'en', 'actú'],
    ['reun', 'o', 'reún'],
    ['aisl', 'a', 'aísl'],
    ['prohib', 'o', 'prohíb'],
    ['rehus', 'o', 'rehús'],
    ['enraiz', 'o', 'enraíz'],
    ['aun', 'o', 'aún'],
    ['descafein', 'o', 'descafeín'],
    ['ri', 'o', 'rí'],
  ])('%s + %s → %s', (raiz, desinencia, esperado) => {
    expect(acentuarHiato(raiz, desinencia, true)).toBe(esperado);
  });
});
