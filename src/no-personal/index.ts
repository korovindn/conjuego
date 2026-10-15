import { agregarEnclitico, ortografiarPorClase } from '../ortografia';
import { Ajustes, Clase } from '../types';

const pronominalizar = (forma: string, pronominal: boolean) =>
  pronominal ? agregarEnclitico(forma, 'se') : forma;

export const infinitivo = (
  raiz: string,
  clase: Clase,
  pronominal: boolean,
  ajustes: Ajustes = {},
) => {
  return pronominalizar(
    ortografiarPorClase(raiz, clase, ajustes)('ár', 'ér', 'ír'),
    pronominal,
  );
};

export const gerundio = (
  raiz: string,
  clase: Clase,
  pronominal: boolean,
  ajustes: Ajustes = {},
) => {
  return pronominalizar(
    ortografiarPorClase(raiz, clase, ajustes)('ándo', 'iéndo', 'iéndo'),
    pronominal,
  );
};

export const participioPasado = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
) => {
  return ortografiarPorClase(raiz, clase, ajustes)('ádo', 'ído', 'ído');
};
