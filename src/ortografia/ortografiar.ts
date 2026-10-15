import { porClase } from '../helpers';
import { Ajustes, Clase } from '../types';
import { resolverTilde } from './tilde';
import { unir } from './unir';

export const ortografiar = (
  raiz: string,
  clase: Clase,
  desinencia: string,
  ajustes: Ajustes = {},
) => resolverTilde(unir(raiz, clase, desinencia, ajustes));

export const ortografiarPorClase =
  (raiz: string, clase: Clase, ajustes: Ajustes = {}) =>
  (ar: string, er: string, ir: string) =>
    ortografiar(raiz, clase, porClase(ar, er, ir)(clase), ajustes);
