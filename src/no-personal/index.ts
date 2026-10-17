import { formarPorClase } from '../formar';
import {
  Ajustes,
  Clase,
  FORMA_NO_PERSONAL,
  FormaNoPersonal,
  Tabla,
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

export const mapear = (
  tabla: Tabla<string>[typeof FORMA_NO_PERSONAL],
  mapeador: (forma: string, tipo: FormaNoPersonal) => string,
): Tabla<string>[typeof FORMA_NO_PERSONAL] => ({
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
