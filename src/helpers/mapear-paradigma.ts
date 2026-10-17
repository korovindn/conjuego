import { Celda } from '../types';

export const mapearParadigma = <C extends Celda>(
  paradigma: Record<C, string>,
  mapeador: (forma: string, celda: C) => string,
): Record<C, string> => {
  const resultado = { ...paradigma };

  for (const celda of Object.keys(paradigma) as C[]) {
    resultado[celda] = mapeador(paradigma[celda], celda);
  }

  return resultado;
};
