import {
  Celda,
  CeldaImperativo,
  Paradigma,
  ParadigmaImperativo,
} from '../types';

export const mapearParadigmaImperativo = <F, G>(
  paradigma: ParadigmaImperativo<F>,
  mapeador: (forma: F, celda: CeldaImperativo) => G,
): ParadigmaImperativo<G> => ({
  [Celda.SEGUNDA_SINGULAR]: mapeador(
    paradigma[Celda.SEGUNDA_SINGULAR],
    Celda.SEGUNDA_SINGULAR,
  ),
  [Celda.SEGUNDA_SINGULAR_VOSEO]: mapeador(
    paradigma[Celda.SEGUNDA_SINGULAR_VOSEO],
    Celda.SEGUNDA_SINGULAR_VOSEO,
  ),
  [Celda.TERCERA_SINGULAR]: mapeador(
    paradigma[Celda.TERCERA_SINGULAR],
    Celda.TERCERA_SINGULAR,
  ),
  [Celda.PRIMERA_PLURAL]: mapeador(
    paradigma[Celda.PRIMERA_PLURAL],
    Celda.PRIMERA_PLURAL,
  ),
  [Celda.SEGUNDA_PLURAL]: mapeador(
    paradigma[Celda.SEGUNDA_PLURAL],
    Celda.SEGUNDA_PLURAL,
  ),
  [Celda.TERCERA_PLURAL]: mapeador(
    paradigma[Celda.TERCERA_PLURAL],
    Celda.TERCERA_PLURAL,
  ),
});

export const mapearParadigma = <F, G>(
  paradigma: Paradigma<F>,
  mapeador: (forma: F, celda: Celda) => G,
): Paradigma<G> => ({
  [Celda.PRIMERA_SINGULAR]: mapeador(
    paradigma[Celda.PRIMERA_SINGULAR],
    Celda.PRIMERA_SINGULAR,
  ),
  ...mapearParadigmaImperativo(paradigma, mapeador),
});
