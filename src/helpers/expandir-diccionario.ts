import { Diccionario, EntradaVerbo } from '../types';

const heredable = ({
  abstracto: _abstracto,
  hijos: _hijos,
  ...resto
}: EntradaVerbo): EntradaVerbo => resto;

export const expandirDiccionario = (diccionario: Diccionario): Diccionario => {
  const expandido = new Map(diccionario);

  for (const [_padre, entrada] of diccionario) {
    for (const hijo of entrada.hijos ?? []) {
      expandido.set(hijo, { ...heredable(entrada), ...diccionario.get(hijo) });
    }
  }

  return expandido;
};
