import { mapearForma, mapearParadigmaImperativo } from '../helpers';
import { formarPorClase } from '../formar';
import {
  Ajustes,
  Celda,
  CeldaImperativo,
  Clase,
  Forma,
  Formas,
  Modo,
  Paradigma,
  ParadigmaImperativo,
  Polaridad,
  TablaInterna,
  Tiempo,
} from '../types';

type Presente = Partial<Paradigma>;

const negativa = <P extends Presente>({
  [Celda.PRIMERA_SINGULAR]: _yo,
  ...resto
}: P) => resto;

const comunes = <P extends Presente>({
  [Celda.SEGUNDA_SINGULAR]: _tu,
  [Celda.SEGUNDA_SINGULAR_VOSEO]: _vos,
  [Celda.SEGUNDA_PLURAL]: _vosotros,
  ...resto
}: P) => resto;

const recortar = (forma: string) => forma.slice(0, -1);

const recortarSiHay = (
  indicativo: Presente,
  celda: CeldaImperativo,
): Partial<ParadigmaImperativo> => {
  const casilla = indicativo[celda];

  return casilla === undefined
    ? {}
    : { [celda]: mapearForma(casilla, recortar) };
};

export const imperativo = (
  raiz: string,
  clase: Clase,
  indicativoPresente: Paradigma<Forma>,
  subjuntivoPresente: Paradigma<Forma>,
  ajustes: Ajustes = {},
): TablaInterna<Forma>[Modo.IMPERATIVO] => {
  const negativo = negativa(subjuntivoPresente);

  return {
    [Polaridad.AFIRMATIVA]: {
      ...comunes(negativo),
      [Celda.SEGUNDA_SINGULAR]: mapearForma(
        indicativoPresente[Celda.SEGUNDA_SINGULAR],
        recortar,
      ),
      [Celda.SEGUNDA_SINGULAR_VOSEO]: mapearForma(
        indicativoPresente[Celda.SEGUNDA_SINGULAR_VOSEO],
        recortar,
      ),
      [Celda.SEGUNDA_PLURAL]: formarPorClase(raiz, clase, ajustes)(
        'ád',
        'éd',
        'íd',
      ),
    },
    [Polaridad.NEGATIVA]: negativo,
  };
};

export const completarImperativo = (formas: Formas): Formas => {
  const indicativo: Presente = formas[Modo.INDICATIVO]?.[Tiempo.PRESENTE] ?? {};
  const negativo = negativa<Presente>(
    formas[Modo.SUBJUNTIVO]?.[Tiempo.PRESENTE] ?? {},
  );

  return {
    ...formas,
    [Modo.IMPERATIVO]: {
      [Polaridad.AFIRMATIVA]: {
        ...comunes(negativo),
        ...recortarSiHay(indicativo, Celda.SEGUNDA_SINGULAR),
        ...recortarSiHay(indicativo, Celda.SEGUNDA_SINGULAR_VOSEO),
        ...formas[Modo.IMPERATIVO]?.[Polaridad.AFIRMATIVA],
      },
      [Polaridad.NEGATIVA]: {
        ...negativo,
        ...formas[Modo.IMPERATIVO]?.[Polaridad.NEGATIVA],
      },
    },
  };
};

export const mapear = <F, G>(
  tabla: TablaInterna<F>[Modo.IMPERATIVO],
  mapeador: (forma: F, polaridad: Polaridad, celda: CeldaImperativo) => G,
): TablaInterna<G>[Modo.IMPERATIVO] => {
  const mapearPolaridad = (polaridad: Polaridad) =>
    mapearParadigmaImperativo(tabla[polaridad], (forma, celda) =>
      mapeador(forma, polaridad, celda),
    );

  return {
    [Polaridad.AFIRMATIVA]: mapearPolaridad(Polaridad.AFIRMATIVA),
    [Polaridad.NEGATIVA]: mapearPolaridad(Polaridad.NEGATIVA),
  };
};
