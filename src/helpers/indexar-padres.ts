import { Diccionario } from '../types';

export const indexarPadres = (
  diccionario: Diccionario,
): ReadonlyMap<string, string> => {
  const padres = new Map<string, string>();

  for (const [padre, { hijos = [] }] of diccionario) {
    for (const hijo of hijos) {
      if (!hijo.endsWith(padre)) {
        throw new Error(`"${hijo}" no termina en su padre "${padre}"`);
      }

      padres.set(hijo, padre);
    }
  }

  return padres;
};
