import { describe, expect, it } from 'vitest';
import { Clase } from '../types';
import { porClase } from './por-clase';

describe('porClase', () => {
  it.each([
    [Clase.AR, 'amos'],
    [Clase.ER, 'emos'],
    [Clase.IR, 'imos'],
  ] as const)('selecciona el valor para %s', (clase, esperado) => {
    const terminacion = porClase('amos', 'emos', 'imos');

    expect(terminacion(clase)).toBe(esperado);
  });

  it('devuelve los objetos originales', () => {
    const ar = { terminacion: 'amos' };
    const er = { terminacion: 'emos' };
    const ir = { terminacion: 'imos' };
    const terminacion = porClase(ar, er, ir);

    expect(terminacion(Clase.AR)).toBe(ar);
    expect(terminacion(Clase.ER)).toBe(er);
    expect(terminacion(Clase.IR)).toBe(ir);
  });
});
