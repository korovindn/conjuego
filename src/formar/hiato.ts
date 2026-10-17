import { acentuarUltimaDebil } from './silabas';
import { llevaTilde } from './tilde';

export const acentuarHiato = (
  raiz: string,
  desinencia: string,
  hiato?: boolean,
): string =>
  !hiato || llevaTilde(desinencia) ? raiz : acentuarUltimaDebil(raiz);
