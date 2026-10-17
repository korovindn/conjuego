import { PRONOMINAL } from '../const';
import { Celda, FormaNoPersonal, Polaridad } from '../types';
import { agregarEnclitico } from './enclitico';

export const pronominalizar = (
  forma: string,
  celda: Celda,
  polaridad?: Polaridad,
): string =>
  polaridad === Polaridad.AFIRMATIVA
    ? agregarEnclitico(forma, PRONOMINAL[celda])
    : `${PRONOMINAL[celda]} ${forma}`;

export const pronominalizarNoPersonal = (
  forma: string,
  tipo: FormaNoPersonal,
): string =>
  tipo === FormaNoPersonal.PARTICIPIO_PASADO
    ? forma
    : agregarEnclitico(forma, 'se');
