import { mapearParadigma } from '../helpers';
import { ortografiarPorClase } from '../ortografia';
import {
  Ajustes,
  Celda,
  CeldaImperativo,
  Clase,
  Forma,
  Modo,
  Paradigma,
  Polaridad,
  Tabla,
} from '../types';

export const imperativo = (
  raiz: string,
  clase: Clase,
  indicativoPresente: Paradigma,
  subjuntivoPresente: Paradigma,
  ajustes: Ajustes = {},
): Tabla[Modo.IMPERATIVO] => {
  const { [Celda.PRIMERA_SINGULAR]: _yo, ...subjuntivo } = subjuntivoPresente;

  return {
    [Polaridad.AFIRMATIVA]: {
      ...subjuntivo,
      [Celda.SEGUNDA_SINGULAR]: indicativoPresente[
        Celda.SEGUNDA_SINGULAR
      ].slice(0, -1),
      [Celda.SEGUNDA_SINGULAR_VOSEO]: indicativoPresente[
        Celda.SEGUNDA_SINGULAR_VOSEO
      ].slice(0, -1),
      [Celda.SEGUNDA_PLURAL]: ortografiarPorClase(raiz, clase, ajustes)('ád', 'éd', 'íd'),
    },
    [Polaridad.NEGATIVA]: subjuntivo,
  };
};

export const mapear = (
  tabla: Tabla[Modo.IMPERATIVO],
  mapeador: (
    forma: Forma,
    polaridad: Polaridad,
    celda: CeldaImperativo,
  ) => string,
): Tabla[Modo.IMPERATIVO] => {
  const mapearPolaridad = (polaridad: Polaridad) =>
    mapearParadigma(tabla[polaridad], (forma, celda) =>
      mapeador(forma, polaridad, celda),
    );

  return {
    [Polaridad.AFIRMATIVA]: mapearPolaridad(Polaridad.AFIRMATIVA),
    [Polaridad.NEGATIVA]: mapearPolaridad(Polaridad.NEGATIVA),
  };
};
