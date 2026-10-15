import { describe, expect, it } from 'vitest';
import { agregarEnclitico } from './enclitico';

describe('agregarEnclitico', () => {
  it.each([
    ['lavar', 'se', 'lavarse'],
    ['reír', 'se', 'reírse'],
    ['lavando', 'se', 'lavándose'],
    ['comiendo', 'se', 'comiéndose'],
    ['leyendo', 'lo', 'leyéndolo'],
    ['lava', 'te', 'lávate'],
    ['lavá', 'te', 'lavate'],
    ['come', 'telo', 'cómetelo'],
    ['lavemos', 'nos', 'lavémonos'],
    ['digamos', 'selo', 'digámoselo'],
    ['lavad', 'os', 'lavaos'],
    ['comed', 'os', 'comeos'],
    ['aburrid', 'os', 'aburríos'],
    ['lavad', 'nos', 'lavadnos'],
    ['lavemos', 'lo', 'lavémoslo'],
  ])('%s + %s → %s', (forma, enclitico, esperado) => {
    expect(agregarEnclitico(forma, enclitico)).toBe(esperado);
  });
});
