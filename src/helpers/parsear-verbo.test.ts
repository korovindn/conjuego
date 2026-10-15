import { describe, expect, it } from 'vitest';
import { Clase } from '../types';
import { parsearVerbo } from './parsear-verbo';

describe('parsearVerbo', () => {
  it.each([
    ['hablar', 'habl', Clase.AR, false],
    ['comer', 'com', Clase.ER, false],
    ['vivir', 'viv', Clase.IR, false],
    ['reír', 're', Clase.IR, false],
    ['lavarse', 'lav', Clase.AR, true],
    ['comerse', 'com', Clase.ER, true],
    ['vestirse', 'vest', Clase.IR, true],
    ['reírse', 're', Clase.IR, true],
  ] as const)('clasifica %s', (verbo, raiz, clase, pronominal) => {
    expect(parsearVerbo(verbo)).toEqual([raiz, clase, pronominal]);
  });

  it.each(['', 'se', 'casa'])('rechaza el infinitivo inválido %j', (verbo) => {
    expect(() => parsearVerbo(verbo)).toThrow('Verbo inválido:');
  });
});
