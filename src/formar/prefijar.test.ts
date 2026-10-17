import { describe, expect, it } from 'vitest';
import { prefijar } from './prefijar';

describe('prefijar', () => {
  it.each([
    ['de', 'ten', 'detén'],
    ['des', 'hecho', 'deshecho'],
    ['re', 'hice', 'rehíce'],
    ['re', 'hincho', 'rehíncho'],
    ['pre', 'ves', 'prevés'],
    ['pre', 'veis', 'prevéis'],
    ['pre', 'vemos', 'prevemos'],
    ['son', 'rio', 'sonrió'],
  ])('%s + %s → %s', (prefijo, forma, esperada) => {
    expect(prefijar(prefijo, forma)).toBe(esperada);
  });
});
