import { Clase } from '../types';

export const parsearVerbo = (verbo: string): [string, Clase, boolean] => {
  const pronominal = verbo.endsWith('se');

  const clase = pronominal ? verbo.slice(-4, -2) : verbo.slice(-2);
  const raiz = pronominal ? verbo.slice(0, -4) : verbo.slice(0, -2);

  if (clase === Clase.AR || clase === Clase.ER || clase === Clase.IR) {
    return [raiz, clase, pronominal];
  }

  if (clase === 'ír') {
    return [raiz, Clase.IR, pronominal];
  }

  throw new Error(`Verbo inválido: ${clase}`);
};
