import { agregarEnclitico, formarPorClase } from '../formar';
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
    formarPorClase(raiz, clase, ajustes)('ár', 'ér', 'ír'),
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
    formarPorClase(raiz, clase, ajustes)('ándo', 'iéndo', 'iéndo'),
    pronominal,
  );
};

export const participioPasado = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
) => {
  return formarPorClase(raiz, clase, ajustes)('ádo', 'ído', 'ído');
};
