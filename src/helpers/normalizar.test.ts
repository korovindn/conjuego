import { describe, expect, it } from 'vitest';
import { normalizar } from './normalizar';

describe('normalizar', () => {
  it.each([
    ['hablar', 'hablar'],
    ['HABLAR', 'hablar'],
    ['ReÍr', 'reír'],
    ['  comer  ', 'comer'],
    ['\n\tVivir\n', 'vivir'],
    ['  SE  ', 'se'],
  ])('normaliza %j', (palabra, esperado) => {
    expect(normalizar(palabra)).toBe(esperado);
  });

  it('compone los acentos descompuestos', () => {
    expect(normalizar('rei\u0301r')).toBe('reír');
    expect(normalizar('REI\u0301R')).toBe('reír');
  });

  it('conserva los espacios internos', () => {
    expect(normalizar('  a  b  ')).toBe('a  b');
  });
});
