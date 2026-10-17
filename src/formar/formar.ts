import { alternar } from './alternar';
import { acentuarHiato } from './hiato';
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
      acentuarHiato(
        alternar(raiz, clase, desinencia, ajustes.alternancia),
        desinencia,
        ajustes.hiato,
      ),
      clase,
      desinencia,
      ajustes,
    ),
  );

export const formarPorClase =
  (raiz: string, clase: Clase, ajustes: Ajustes = {}) =>
  (ar: string, er: string, ir: string) =>
    formar(raiz, clase, porClase(ar, er, ir)(clase), ajustes);
