import { describe, expect, it } from 'vitest';
import { nucleos } from './silabas';

describe('nucleos', () => {
  it.each([
    ['hablar', ['a', 'a']],
    ['cambio', ['a', 'io']],
    ['fiais', ['iai']],
    ['averiguáis', ['a', 'e', 'i', 'uái']],
    ['construimos', ['o', 'ui', 'o']],
    ['reímos', ['e', 'í', 'o']],
    ['leo', ['e', 'o']],
    ['busqué', ['u', 'é']],
    ['averigüé', ['a', 'e', 'i', 'üé']],
    ['prohibir', ['ohi', 'i']],
    ['prohíbo', ['o', 'í', 'o']],
    ['rehuid', ['ehu', 'i']],
    ['rehuíos', ['ehu', 'í', 'o']],
    ['estoy', ['e', 'o']],
  ])('%s → %j', (palabra, esperado) => {
    expect(nucleos(palabra)).toEqual(esperado);
  });
});
