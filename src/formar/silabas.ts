const FUERTE = '[aeoáéó]';
const DEBIL_TONICA = '[íú]';
const U_SONORA = '(?:(?<![qg])u|u(?![eiéí]))';
const DEBIL = `(?:[iü]|${U_SONORA})`;
const NUCLEO = new RegExp(
  `((?:${DEBIL}h?)*${FUERTE}(?:h?${DEBIL})?|(?:${DEBIL}|${DEBIL_TONICA})+)`,
);
const CON_TILDE: Record<string, string> = {
  a: 'á',
  e: 'é',
  i: 'í',
  o: 'ó',
  u: 'ú',
};

const partir = (palabra: string) => palabra.split(NUCLEO);
const esNucleo = (posicion: number) => posicion % 2 === 1;
const posicionDelNucleo = (indice: number) => 2 * indice + 1;
const ULTIMA_DEBIL = /[iu](?=[^iu]*$)/;

export const acentuarUltimaDebil = (texto: string) =>
  texto.replace(ULTIMA_DEBIL, (vocal) => CON_TILDE[vocal]);

const acentuarNucleo = (nucleo: string) =>
  /[aeo]/.test(nucleo)
    ? nucleo.replace(/[aeo]/, (vocal) => CON_TILDE[vocal])
    : acentuarUltimaDebil(nucleo);

export const nucleos = (palabra: string) =>
  partir(palabra).filter((_, posicion) => esNucleo(posicion));

export const acentuar = (palabra: string, indice: number) =>
  partir(palabra)
    .map((parte, i) =>
      i === posicionDelNucleo(indice) ? acentuarNucleo(parte) : parte,
    )
    .join('');
