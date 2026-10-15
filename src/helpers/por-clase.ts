import { Clase } from '../types';

export const porClase =
  <T>(ar: T, er: T, ir: T) =>
  (clase: Clase): T => {
    switch (clase) {
      case Clase.AR: {
        return ar;
      }
      case Clase.ER: {
        return er;
      }
      case Clase.IR: {
        return ir;
      }
    }
  };
