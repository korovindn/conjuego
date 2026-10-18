import { describe, expect, it } from 'vitest';
import { mapearForma } from './mapear-forma';

describe('mapearForma', () => {
  const mayusculas = (forma: string) => forma.toUpperCase();

  it('transforma una forma simple', () => {
    expect(mapearForma('ten', mayusculas)).toBe('TEN');
  });

  it('transforma cada variante', () => {
    expect(mapearForma(['roo', 'roigo'], mayusculas)).toEqual(['ROO', 'ROIGO']);
  });

  it('conserva la celda vacía', () => {
    expect(mapearForma(null, mayusculas)).toBeNull();
  });
});
