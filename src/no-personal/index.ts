import { formarPorClase } from '../formar';
import {
  Ajustes,
  Clase,
  FORMA_NO_PERSONAL,
  FormaNoPersonal,
  TablaInterna,
} from '../types';

export const infinitivo = (raiz: string, clase: Clase, ajustes: Ajustes = {}) =>
  formarPorClase(raiz, clase, ajustes)('ár', 'ér', 'ír');

export const gerundio = (raiz: string, clase: Clase, ajustes: Ajustes = {}) =>
  formarPorClase(raiz, clase, ajustes)('ándo', 'iéndo', 'iéndo');

export const participioPasado = (
  raiz: string,
  clase: Clase,
  ajustes: Ajustes = {},
) => formarPorClase(raiz, clase, ajustes)('ádo', 'ído', 'ído');

export const mapear = <F, G>(
  tabla: TablaInterna<F>[typeof FORMA_NO_PERSONAL],
  mapeador: (forma: F, tipo: FormaNoPersonal) => G,
): TablaInterna<G>[typeof FORMA_NO_PERSONAL] => ({
  [FormaNoPersonal.INFINITIVO]: mapeador(
    tabla[FormaNoPersonal.INFINITIVO],
    FormaNoPersonal.INFINITIVO,
  ),
  [FormaNoPersonal.GERUNDIO]: mapeador(
    tabla[FormaNoPersonal.GERUNDIO],
    FormaNoPersonal.GERUNDIO,
  ),
  [FormaNoPersonal.PARTICIPIO_PASADO]: mapeador(
    tabla[FormaNoPersonal.PARTICIPIO_PASADO],
    FormaNoPersonal.PARTICIPIO_PASADO,
  ),
});
