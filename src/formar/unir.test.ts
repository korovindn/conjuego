import { describe, expect, it } from 'vitest';
import { Clase } from '../types';
import { unir, unirLiteral } from './unir';

describe('unir', () => {
  it.each([
    ['habl', Clase.AR, 'o', 'hablo'],
    ['com', Clase.ER, 'ió', 'comió'],
    ['viv', Clase.IR, 'iéndo', 'viviéndo'],
  ] as const)('sin cambios: %s + %s', (raiz, clase, desinencia, esperado) => {
    expect(unir(raiz, clase, desinencia)).toBe(esperado);
  });

  it.each([
    ['busc', 'é', 'busqué'],
    ['busc', 'e', 'busque'],
    ['busc', 'o', 'busco'],
    ['lleg', 'é', 'llegué'],
    ['lleg', 'émos', 'lleguémos'],
    ['empez', 'é', 'empecé'],
    ['averigu', 'é', 'averigüé'],
    ['averigu', 'o', 'averiguo'],
    ['baj', 'e', 'baje'],
  ] as const)('-ar ante e: %s + %s → %s', (raiz, desinencia, esperado) => {
    expect(unir(raiz, Clase.AR, desinencia)).toBe(esperado);
  });

  it.each([
    ['venc', Clase.ER, 'o', 'venzo'],
    ['venc', Clase.ER, 'a', 'venza'],
    ['venc', Clase.ER, 'e', 'vence'],
    ['cog', Clase.ER, 'a', 'coja'],
    ['cog', Clase.ER, 'iéndo', 'cogiéndo'],
    ['dirig', Clase.IR, 'o', 'dirijo'],
    ['distingu', Clase.IR, 'o', 'distingo'],
    ['distingu', Clase.IR, 'ió', 'distinguió'],
    ['delinqu', Clase.IR, 'a', 'delinca'],
    ['tej', Clase.ER, 'o', 'tejo'],
  ] as const)(
    '-er, -ir ante a, o: %s + %s → %s',
    (raiz, clase, desinencia, esperado) => {
      expect(unir(raiz, clase, desinencia)).toBe(esperado);
    },
  );

  it.each([
    ['conoc', Clase.ER, 'o', 'conozco'],
    ['conoc', Clase.ER, 'a', 'conozca'],
    ['conoc', Clase.ER, 'e', 'conoce'],
    ['conoc', Clase.ER, 'ió', 'conoció'],
    ['nac', Clase.ER, 'o', 'nazco'],
    ['luc', Clase.IR, 'o', 'luzco'],
    ['produc', Clase.IR, 'ámos', 'produzcámos'],
    ['esparc', Clase.IR, 'a', 'esparza'],
  ] as const)(
    'vocal + c ante a, o → zc: %s + %s → %s',
    (raiz, clase, desinencia, esperado) => {
      expect(unir(raiz, clase, desinencia)).toBe(esperado);
    },
  );

  it.each([
    ['mec', Clase.ER, 'o', 'mezo'],
    ['mec', Clase.ER, 'a', 'meza'],
    ['coc', Clase.ER, 'o', 'cozo'],
  ] as const)(
    'zc desactivado: %s + %s → %s',
    (raiz, clase, desinencia, esperado) => {
      expect(unir(raiz, clase, desinencia, { zc: false })).toBe(esperado);
    },
  );

  it.each([
    ['le', Clase.ER, 'ió', 'leyó'],
    ['le', Clase.ER, 'iéron', 'leyéron'],
    ['le', Clase.ER, 'iéndo', 'leyéndo'],
    ['le', Clase.ER, 'iéra', 'leyéra'],
    ['le', Clase.ER, 'ímos', 'leímos'],
    ['o', Clase.IR, 'iéndo', 'oyéndo'],
    ['constru', Clase.IR, 'ió', 'construyó'],
    ['argü', Clase.IR, 'ió', 'arguyó'],
    ['argü', Clase.IR, 'iéndo', 'arguyéndo'],
    ['argü', Clase.IR, 'ímos', 'argüímos'],
  ] as const)(
    'i átona entre vocales → y: %s + %s → %s',
    (raiz, clase, desinencia, esperado) => {
      expect(unir(raiz, clase, desinencia)).toBe(esperado);
    },
  );

  it.each([
    ['gruñ', Clase.IR, 'ió', 'gruñó'],
    ['gruñ', Clase.IR, 'iéron', 'gruñéron'],
    ['gruñ', Clase.IR, 'iéndo', 'gruñéndo'],
    ['bull', Clase.IR, 'ió', 'bulló'],
    ['tañ', Clase.ER, 'iése', 'tañése'],
    ['gruñ', Clase.IR, 'ímos', 'gruñímos'],
  ] as const)(
    'i átona tras ñ, ll desaparece: %s + %s → %s',
    (raiz, clase, desinencia, esperado) => {
      expect(unir(raiz, clase, desinencia)).toBe(esperado);
    },
  );

  it.each([
    ['ri', Clase.IR, 'ió', 'rió'],
    ['ri', Clase.IR, 'iéron', 'riéron'],
    ['ri', Clase.IR, 'iéndo', 'riéndo'],
    ['ri', Clase.IR, 'iése', 'riése'],
    ['re', Clase.IR, 'ímos', 'reímos'],
  ] as const)(
    'i átona tras i desaparece: %s + %s → %s',
    (raiz, clase, desinencia, esperado) => {
      expect(unir(raiz, clase, desinencia)).toBe(esperado);
    },
  );

  it.each([
    ['hu', 'o', 'huyo'],
    ['hu', 'es', 'huyes'],
    ['hu', 'a', 'huya'],
    ['constru', 'en', 'construyen'],
    ['constru', 'ámos', 'construyámos'],
    ['argü', 'o', 'arguyo'],
    ['argü', 'e', 'arguye'],
    ['rehú', 'o', 'rehúyo'],
  ] as const)(
    '-uir: y ante a, e, o: %s + %s → %s',
    (raiz, desinencia, esperado) => {
      expect(unir(raiz, Clase.IR, desinencia)).toBe(esperado);
    },
  );

  it.each([
    ['segu', Clase.IR, 'o', 'sego'],
    ['segu', Clase.IR, 'a', 'sega'],
    ['distingu', Clase.IR, 'o', 'distingo'],
    ['delinqu', Clase.IR, 'o', 'delinco'],
    ['hu', Clase.IR, 'ímos', 'huímos'],
    ['actu', Clase.AR, 'o', 'actuo'],
  ] as const)(
    'sin y tras u muda, ante i o en -ar: %s + %s → %s',
    (raiz, clase, desinencia, esperado) => {
      expect(unir(raiz, clase, desinencia)).toBe(esperado);
    },
  );

  it.each([
    ['teng', Clase.ER, 'o', 'tengo'],
    ['dig', Clase.IR, 'a', 'diga'],
    ['hic', Clase.ER, 'o', 'hico'],
    ['ve', Clase.ER, 'o', 'veo'],
    ['dij', Clase.IR, 'iéron', 'dijéron'],
    ['traj', Clase.ER, 'iéra', 'trajéra'],
    ['tuv', Clase.ER, 'iéron', 'tuviéron'],
  ] as const)(
    'raíz literal: %s + %s → %s',
    (raiz, clase, desinencia, esperado) => {
      expect(unirLiteral(raiz, clase, desinencia)).toBe(esperado);
    },
  );

  it('j de una raíz regular conserva la i', () => {
    expect(unir('tej', Clase.ER, 'iéron')).toBe('tejiéron');
  });
});
