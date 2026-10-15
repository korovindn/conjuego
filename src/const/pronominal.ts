import { Celda } from '../types';

export const PRONOMINAL: Record<Celda, string> = {
  [Celda.PRIMERA_SINGULAR]: 'me',
  [Celda.PRIMERA_PLURAL]: 'nos',
  [Celda.SEGUNDA_SINGULAR]: 'te',
  [Celda.SEGUNDA_SINGULAR_VOSEO]: 'te',
  [Celda.SEGUNDA_PLURAL]: 'os',
  [Celda.TERCERA_SINGULAR]: 'se',
  [Celda.TERCERA_PLURAL]: 'se',
};
