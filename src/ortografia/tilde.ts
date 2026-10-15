import { acentuar, nucleos } from './silabas';

enum Acentuacion {
  AGUDA = 'aguda',
  LLANA = 'llana',
  ESDRUJULA = 'esdrujula',
}

const TILDE = /[áéíóú]/;
const HIATO = /[aeo]h?[íú]|[íú]h?[aeo]/;

const SIN_TILDE: Record<string, string> = {
  á: 'a',
  é: 'e',
  í: 'i',
  ó: 'o',
  ú: 'u',
};

const llevaTilde = (texto: string) => TILDE.test(texto);
const quitarTilde = (palabra: string) =>
  palabra.replace(TILDE, (vocal) => SIN_TILDE[vocal]);
const terminaEnVocalNS = (palabra: string) => /[aeiouáéíóúns]$/.test(palabra);
const acentuacionNatural = (palabra: string): Acentuacion =>
  nucleos(palabra).length > 1 && terminaEnVocalNS(palabra) ? Acentuacion.LLANA : Acentuacion.AGUDA;
const acentuacion = (marcada: string): Acentuacion => {
  const desdeLaUltima = nucleos(marcada).reverse().findIndex(llevaTilde);
  return desdeLaUltima === 0
    ? Acentuacion.AGUDA
    : desdeLaUltima === 1
      ? Acentuacion.LLANA
      : Acentuacion.ESDRUJULA;
};
const exigeTilde = (marcada: string) =>
  HIATO.test(marcada) || acentuacion(marcada) !== acentuacionNatural(marcada);

export const resolverTilde = (marcada: string): string =>
  !llevaTilde(marcada) || exigeTilde(marcada) ? marcada : quitarTilde(marcada);

export const marcarTonica = (palabra: string): string => {
  if (llevaTilde(palabra)) {
    return palabra;
  }

  const ultima = nucleos(palabra).length - 1;
  const tonica = acentuacionNatural(palabra) === Acentuacion.LLANA ? ultima - 1 : ultima;

  return acentuar(palabra, tonica);
};
