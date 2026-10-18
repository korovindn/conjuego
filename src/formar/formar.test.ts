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

  it.each([
    ['envi', Clase.AR, 'o', 'envío'],
    ['envi', Clase.AR, 'ámos', 'enviamos'],
    ['actu', Clase.AR, 'an', 'actúan'],
    ['reun', Clase.IR, 'o', 'reúno'],
    ['enraiz', Clase.AR, 'e', 'enraíce'],
    ['rehu', Clase.IR, 'o', 'rehúyo'],
    ['rehu', Clase.IR, 'ímos', 'rehuimos'],
  ] as const)('hiato: %s + %s → %s', (raiz, clase, desinencia, esperado) => {
    expect(formar(raiz, clase, desinencia, { hiato: true })).toBe(esperado);
  });

  it.each([
    ['teng', Clase.ER, 'o', 'tengo'],
    ['tuv', Clase.ER, 'íste', 'tuviste'],
    ['tuv', Clase.ER, 'iéramos', 'tuviéramos'],
    ['dij', Clase.IR, 'iéron', 'dijeron'],
    ['tendr', Clase.ER, 'émos', 'tendremos'],
    ['tendr', Clase.ER, 'ía', 'tendría'],
  ] as const)(
    'raíz irregular: %s + %s → %s',
    (raiz, clase, desinencia, esperado) => {
      expect(formar('', clase, desinencia, {}, raiz)).toBe(esperado);
    },
  );

  it('raíz con variantes', () => {
    expect(formar('roer', Clase.ER, 'o', {}, ['ro', 'roig', 'roy'])).toEqual([
      'roo',
      'roigo',
      'royo',
    ]);
  });
});
