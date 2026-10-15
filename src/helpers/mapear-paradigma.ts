import { Celda, Forma } from '../types';

export const mapearParadigma = <C extends Celda>(
  paradigma: Record<C, Forma>,
  mapeador: (forma: Forma, celda: C) => Forma,
): Record<C, Forma> => {
  const resultado = { ...paradigma };

  for (const celda of Object.keys(paradigma) as C[]) {
    resultado[celda] = mapeador(paradigma[celda], celda);
  }

  return resultado;
};
