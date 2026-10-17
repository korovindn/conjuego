import { alternar } from './alternar';
import { porClase } from '../helpers';
import { Ajustes, Clase } from '../types';
import { resolverTilde } from './tilde';
import { unir } from './unir';

export const formar = (
  raiz: string,
  clase: Clase,
  desinencia: string,
  ajustes: Ajustes = {},
) =>
  resolverTilde(
    unir(
      alternar(raiz, clase, desinencia, ajustes.alternancia),
      clase,
      desinencia,
      ajustes,
    ),
  );

export const formarPorClase =
  (raiz: string, clase: Clase, ajustes: Ajustes = {}) =>
  (ar: string, er: string, ir: string) =>
    formar(raiz, clase, porClase(ar, er, ir)(clase), ajustes);
