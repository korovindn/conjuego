import { describe, expect, it } from 'vitest';
import { Clase } from '../types';
import { formar } from './formar';

describe('ortografiar', () => {
  it.each([
    ['habl', Clase.AR, 'ámos', 'hablamos'],
    ['habl', Clase.AR, 'ár', 'hablar'],
    ['busc', Clase.AR, 'é', 'busqué'],
    ['averigu', Clase.AR, 'é', 'averigüé'],
    ['lleg', Clase.AR, 'éis', 'lleguéis'],
    ['re', Clase.IR, 'ír', 'reír'],
    ['re', Clase.IR, 'íd', 'reíd'],
    ['le', Clase.ER, 'í', 'leí'],
    ['le', Clase.ER, 'ído', 'leído'],
    ['le', Clase.ER, 'iéndo', 'leyendo'],
    ['le', Clase.ER, 'ió', 'leyó'],
    ['constru', Clase.IR, 'ído', 'construido'],
    ['constru', Clase.IR, 'ímos', 'construimos'],
    ['gruñ', Clase.IR, 'iéron', 'gruñeron'],
    ['venc', Clase.ER, 'ámos', 'venzamos'],
  ] as const)('%s + %s → %s', (raiz, clase, desinencia, esperado) => {
    expect(formar(raiz, clase, desinencia)).toBe(esperado);
  });
});
