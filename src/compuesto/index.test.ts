import { describe, expect, it } from 'vitest';
import { componer } from '.';

describe('componer', () => {
  it('une auxiliar y participio', () => {
    expect(componer('he', 'hablado')).toBe('he hablado');
  });

  it('conserva las variantes del participio', () => {
    expect(componer('he', ['frito', 'freído'])).toEqual([
      'he frito',
      'he freído',
    ]);
  });

  it('usa solo la forma principal de haber', () => {
    expect(componer(['ha', 'hay'], 'hablado')).toBe('ha hablado');
  });

  it('sin participio no hay forma compuesta', () => {
    expect(componer('he', null)).toBeNull();
  });
});
