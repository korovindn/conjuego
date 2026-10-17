import { describe, expect, it } from 'vitest';
import { Alternancia, Clase } from '../types';
import { alternar } from './alternar';

describe('alternar', () => {
  it.each([
    ['pens', Clase.AR, 'o'],
    ['pens', Clase.AR, 'ámos'],
    ['sent', Clase.IR, 'ió'],
  ] as const)(
    'sin alternancia no cambia: %s + %s',
    (raiz, clase, desinencia) => {
      expect(alternar(raiz, clase, desinencia)).toBe(raiz);
    },
  );

  it.each([
    ['pens', Clase.AR, 'o', 'piens'],
    ['pens', Clase.AR, 'as', 'piens'],
    ['pens', Clase.AR, 'e', 'piens'],
    ['pens', Clase.AR, 'ámos', 'pens'],
    ['pens', Clase.AR, 'ás', 'pens'],
    ['pens', Clase.AR, 'é', 'pens'],
    ['pens', Clase.AR, 'ándo', 'pens'],
    ['pens', Clase.AR, 'ád', 'pens'],
    ['perd', Clase.ER, 'o', 'pierd'],
    ['perd', Clase.ER, 'ió', 'perd'],
    ['entend', Clase.ER, 'en', 'entiend'],
    ['quer', Clase.ER, 'o', 'quier'],
    ['discern', Clase.IR, 'o', 'disciern'],
    ['discern', Clase.IR, 'ió', 'discern'],
    ['discern', Clase.IR, 'ámos', 'discern'],
  ] as const)('e>ie: %s + %s → %s', (raiz, clase, desinencia, esperado) => {
    expect(alternar(raiz, clase, desinencia, Alternancia.E_IE)).toBe(esperado);
  });

  it.each([
    ['sent', 'o', 'sient'],
    ['sent', 'es', 'sient'],
    ['sent', 'a', 'sient'],
    ['sent', 'ímos', 'sent'],
    ['sent', 'ís', 'sent'],
    ['sent', 'í', 'sent'],
    ['sent', 'íste', 'sent'],
    ['sent', 'ió', 'sint'],
    ['sent', 'iéron', 'sint'],
    ['sent', 'iéndo', 'sint'],
    ['sent', 'iéra', 'sint'],
    ['sent', 'iése', 'sint'],
    ['sent', 'ámos', 'sint'],
    ['sent', 'áis', 'sint'],
    ['sent', 'ía', 'sent'],
    ['sent', 'iré', 'sent'],
    ['sent', 'ído', 'sent'],
    ['sent', 'íd', 'sent'],
    ['prefer', 'o', 'prefier'],
    ['prefer', 'ió', 'prefir'],
  ] as const)('e>ie/i: %s + %s → %s', (raiz, desinencia, esperado) => {
    expect(alternar(raiz, Clase.IR, desinencia, Alternancia.E_IE_I)).toBe(
      esperado,
    );
  });

  it.each([
    ['ped', 'o', 'pid'],
    ['ped', 'es', 'pid'],
    ['ped', 'a', 'pid'],
    ['ped', 'ámos', 'pid'],
    ['ped', 'ió', 'pid'],
    ['ped', 'iéndo', 'pid'],
    ['ped', 'ímos', 'ped'],
    ['ped', 'ía', 'ped'],
    ['ped', 'ído', 'ped'],
    ['segu', 'o', 'sigu'],
    ['segu', 'ímos', 'segu'],
    ['repet', 'o', 'repit'],
    ['elig', 'o', 'ilig'],
    ['reñ', 'ió', 'riñ'],
  ] as const)('e>i: %s + %s → %s', (raiz, desinencia, esperado) => {
    expect(alternar(raiz, Clase.IR, desinencia, Alternancia.E_I)).toBe(
      esperado,
    );
  });

  it.each([
    ['cont', Clase.AR, 'o', 'cuent'],
    ['cont', Clase.AR, 'ámos', 'cont'],
    ['cont', Clase.AR, 'ó', 'cont'],
    ['volv', Clase.ER, 'a', 'vuelv'],
    ['volv', Clase.ER, 'émos', 'volv'],
    ['almorz', Clase.AR, 'e', 'almuerz'],
    ['colg', Clase.AR, 'e', 'cuelg'],
    ['coc', Clase.ER, 'o', 'cuec'],
    ['avergonz', Clase.AR, 'o', 'avergüenz'],
    ['degoll', Clase.AR, 'o', 'degüell'],
    ['agor', Clase.AR, 'o', 'agüer'],
    ['engros', Clase.AR, 'o', 'engrues'],
  ] as const)('o>ue: %s + %s → %s', (raiz, clase, desinencia, esperado) => {
    expect(alternar(raiz, clase, desinencia, Alternancia.O_UE)).toBe(esperado);
  });

  it.each([
    ['dorm', 'o', 'duerm'],
    ['dorm', 'a', 'duerm'],
    ['dorm', 'ímos', 'dorm'],
    ['dorm', 'ámos', 'durm'],
    ['dorm', 'ió', 'durm'],
    ['dorm', 'iéndo', 'durm'],
    ['dorm', 'ído', 'dorm'],
    ['dorm', 'ía', 'dorm'],
    ['mor', 'iéron', 'mur'],
  ] as const)('o>ue/u: %s + %s → %s', (raiz, desinencia, esperado) => {
    expect(alternar(raiz, Clase.IR, desinencia, Alternancia.O_UE_U)).toBe(
      esperado,
    );
  });

  it.each([
    ['jug', 'o', 'jueg'],
    ['jug', 'e', 'jueg'],
    ['jug', 'ámos', 'jug'],
    ['jug', 'é', 'jug'],
  ] as const)('u>ue: %s + %s → %s', (raiz, desinencia, esperado) => {
    expect(alternar(raiz, Clase.AR, desinencia, Alternancia.U_UE)).toBe(
      esperado,
    );
  });

  it.each([
    ['adquir', 'o', 'adquier'],
    ['adquir', 'a', 'adquier'],
    ['adquir', 'ímos', 'adquir'],
    ['adquir', 'ió', 'adquir'],
    ['adquir', 'ámos', 'adquir'],
  ] as const)('i>ie: %s + %s → %s', (raiz, desinencia, esperado) => {
    expect(alternar(raiz, Clase.IR, desinencia, Alternancia.I_IE)).toBe(
      esperado,
    );
  });

  it.each([
    ['ol', Clase.ER, 'o', 'huel'],
    ['ol', Clase.ER, 'a', 'huel'],
    ['ol', Clase.ER, 'émos', 'ol'],
    ['ol', Clase.ER, 'ió', 'ol'],
    ['malol', Clase.ER, 'o', 'malhuel'],
    ['desos', Clase.AR, 'o', 'deshues'],
    ['desos', Clase.AR, 'ámos', 'desos'],
  ] as const)('o>hue: %s + %s → %s', (raiz, clase, desinencia, esperado) => {
    expect(alternar(raiz, clase, desinencia, Alternancia.O_HUE)).toBe(esperado);
  });

  it.each([
    ['err', 'o', 'yerr'],
    ['err', 'e', 'yerr'],
    ['err', 'ámos', 'err'],
    ['err', 'é', 'err'],
  ] as const)('e>ye: %s + %s → %s', (raiz, desinencia, esperado) => {
    expect(alternar(raiz, Clase.AR, desinencia, Alternancia.E_YE)).toBe(
      esperado,
    );
  });

  it.each([
    ['cont', Clase.AR, 'ándo', Alternancia.O_UE_U],
    ['cont', Clase.AR, 'ámos', Alternancia.O_UE_U],
    ['perd', Clase.ER, 'ió', Alternancia.E_IE_I],
    ['perd', Clase.ER, 'ámos', Alternancia.E_I],
  ] as const)(
    'la vocal cerrada átona es exclusiva de -ir: %s + %s',
    (raiz, clase, desinencia, alternancia) => {
      expect(alternar(raiz, clase, desinencia, alternancia)).toBe(raiz);
    },
  );
});
