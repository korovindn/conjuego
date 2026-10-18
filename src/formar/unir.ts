import { Ajustes, Clase } from '../types';

type Cambio = [de: RegExp, a: string];

const ANTE_E: Cambio[] = [
  [/gu$/, 'gü'],
  [/c$/, 'qu'],
  [/g$/, 'gu'],
  [/z$/, 'c'],
];
const ANTE_A_O: Cambio[] = [
  [/qu$/, 'c'],
  [/gu$/, 'g'],
  [/(?<!s)c$/, 'z'],
  [/g$/, 'j'],
];
const ZC: Cambio = [/(?<=[aeiou])c$/, 'zc'];
const ANTE_Y: Cambio[] = [[/ü$/, 'u']];
const ABIERTA = '[aeoáéó]';
const U_SONORA = '(?:ü|(?<![qg])u)';
const I_ATONA_ANTE_VOCAL = new RegExp(`^i(?=${ABIERTA})`);
const EMPIEZA_POR_ABIERTA = new RegExp(`^${ABIERTA}`);
const TERMINA_EN_VOCAL = new RegExp(`(?:[aeo]|${U_SONORA})$`);
const TERMINA_EN_U_SONORA = new RegExp(`(?:ú|${U_SONORA})$`);
const ABSORBE_I_ATONA = /(?:ñ|ll|i)$/;
const ABSORBE_I_ATONA_LITERAL = /(?:ñ|ll|i|j)$/;

const adaptarDesinencia = (
  raiz: string,
  clase: Clase,
  desinencia: string,
  absorbe = ABSORBE_I_ATONA,
) => {
  if (absorbe.test(raiz)) {
    return desinencia.replace(I_ATONA_ANTE_VOCAL, '');
  }

  if (
    clase === Clase.IR &&
    TERMINA_EN_U_SONORA.test(raiz) &&
    EMPIEZA_POR_ABIERTA.test(desinencia)
  ) {
    return `y${desinencia}`;
  }

  if (TERMINA_EN_VOCAL.test(raiz)) {
    return desinencia.replace(I_ATONA_ANTE_VOCAL, 'y');
  }

  return desinencia;
};
const cambiosDeGrafia = (
  clase: Clase,
  desinencia: string,
  ajustes: Ajustes,
): Cambio[] => {
  if (desinencia.startsWith('y')) {
    return ANTE_Y;
  }

  if (clase === Clase.AR && /^[eé]/.test(desinencia)) {
    return ANTE_E;
  }

  if (clase !== Clase.AR && /^[aáoó]/.test(desinencia)) {
    return ajustes.zc === false ? ANTE_A_O : [ZC, ...ANTE_A_O];
  }

  return [];
};
const adaptarRaiz = (
  raiz: string,
  clase: Clase,
  desinencia: string,
  ajustes: Ajustes,
) => {
  const cambio = cambiosDeGrafia(clase, desinencia, ajustes).find(([de]) =>
    de.test(raiz),
  );

  return cambio ? raiz.replace(cambio[0], cambio[1]) : raiz;
};

export const unir = (
  raiz: string,
  clase: Clase,
  desinencia: string,
  ajustes: Ajustes = {},
) => {
  const desinenciaAdaptada = adaptarDesinencia(raiz, clase, desinencia);
  const raizAdaptada = adaptarRaiz(raiz, clase, desinenciaAdaptada, ajustes);

  return `${raizAdaptada}${desinenciaAdaptada}`;
};

export const unirLiteral = (raiz: string, clase: Clase, desinencia: string) =>
  `${raiz}${adaptarDesinencia(raiz, clase, desinencia, ABSORBE_I_ATONA_LITERAL)}`;
