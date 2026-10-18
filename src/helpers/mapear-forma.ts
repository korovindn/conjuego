import { Casilla, Forma } from '../types';

type Mapeador = (forma: string) => string;

export function mapearForma(forma: Forma, mapeador: Mapeador): Forma;
export function mapearForma(casilla: Casilla, mapeador: Mapeador): Casilla;
export function mapearForma(casilla: Casilla, mapeador: Mapeador): Casilla {
  if (casilla === null) {
    return null;
  }

  if (typeof casilla === 'string') {
    return mapeador(casilla);
  }

  const [principal, ...variantes] = casilla;

  return [mapeador(principal), ...variantes.map(mapeador)];
}
