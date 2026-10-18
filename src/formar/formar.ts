import { alternar } from './alternar';
import { acentuarHiato } from './hiato';
import { mapearForma, porClase } from '../helpers';
import { Ajustes, Clase, Forma } from '../types';
import { resolverTilde } from './tilde';
import { unir, unirLiteral } from './unir';

export const formar = (
  raiz: string,
  clase: Clase,
  desinencia: string,
  ajustes: Ajustes = {},
  raizIrregular?: Forma,
): Forma =>
  raizIrregular === undefined
    ? resolverTilde(
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
      )
    : mapearForma(raizIrregular, (irregular) =>
        resolverTilde(unirLiteral(irregular, clase, desinencia)),
      );

export const formarPorClase =
  (raiz: string, clase: Clase, ajustes: Ajustes = {}, raizIrregular?: Forma) =>
  (ar: string, er: string, ir: string) =>
    formar(raiz, clase, porClase(ar, er, ir)(clase), ajustes, raizIrregular);
