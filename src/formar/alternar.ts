import { llevaTilde } from './tilde';
import { Alternancia, Clase } from '../types';

type Vocal = 'e' | 'o' | 'u' | 'i';

interface Cambio {
  de: Vocal;
  fuerte: string;
  debil?: string;
}

const CAMBIOS: Record<Alternancia, Cambio> = {
  [Alternancia.E_IE]: { de: 'e', fuerte: 'ie' },
  [Alternancia.E_IE_I]: { de: 'e', fuerte: 'ie', debil: 'i' },
  [Alternancia.E_I]: { de: 'e', fuerte: 'i', debil: 'i' },
  [Alternancia.E_YE]: { de: 'e', fuerte: 'ye' },
  [Alternancia.O_UE]: { de: 'o', fuerte: 'ue' },
  [Alternancia.O_UE_U]: { de: 'o', fuerte: 'ue', debil: 'u' },
  [Alternancia.O_HUE]: { de: 'o', fuerte: 'hue' },
  [Alternancia.U_UE]: { de: 'u', fuerte: 'ue' },
  [Alternancia.I_IE]: { de: 'i', fuerte: 'ie' },
};
const EXIGE_DEBIL = /^(?:i[éó]|[aá])/;

const ultima = (vocal: Vocal) => new RegExp(`(g?)${vocal}(?=[^${vocal}]*$)`);
const sustituir = (raiz: string, de: Vocal, a: string) =>
  raiz.replace(ultima(de), (_, g: string) =>
    g && a === 'ue' ? 'güe' : `${g}${a}`,
  );

export const alternar = (
  raiz: string,
  clase: Clase,
  desinencia: string,
  alternancia?: Alternancia,
): string => {
  if (!alternancia) {
    return raiz;
  }

  const { de, fuerte, debil } = CAMBIOS[alternancia];

  if (!llevaTilde(desinencia)) {
    return sustituir(raiz, de, fuerte);
  }

  if (debil && clase === Clase.IR && EXIGE_DEBIL.test(desinencia)) {
    return sustituir(raiz, de, debil);
  }

  return raiz;
};
