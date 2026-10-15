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
  [/c$/, 'z'],
  [/g$/, 'j'],
];
const ZC: Cambio = [/(?<=[aeiou])c$/, 'zc'];
const ANTE_Y: Cambio[] = [[/ü$/, 'u']];
const I_ATONA_ANTE_VOCAL = /^i(?=[aeoáéó])/;
const TERMINA_EN_VOCAL = /(?:[aeoü]|(?<![qg])u)$/;
const TERMINA_EN_PALATAL = /(?:ñ|ll)$/;

const adaptarDesinencia = (raiz: string, desinencia: string) => {
  if (TERMINA_EN_PALATAL.test(raiz)) {
    return desinencia.replace(I_ATONA_ANTE_VOCAL, '');
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
  const desinenciaAdaptada = adaptarDesinencia(raiz, desinencia);
  const raizAdaptada = adaptarRaiz(raiz, clase, desinenciaAdaptada, ajustes);

  return `${raizAdaptada}${desinenciaAdaptada}`;
};
