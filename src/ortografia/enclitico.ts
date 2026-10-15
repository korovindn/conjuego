import { marcarTonica, resolverTilde } from './tilde';

type Elision = [final: RegExp, ante: RegExp];

const ELISIONES: Elision[] = [
  [/(?<=mo)s$/, /^(?:nos|se)/],
  [/d$/, /^os/],
];

const elidir = (forma: string, enclitico: string) => {
  const elision = ELISIONES.find(([, ante]) => ante.test(enclitico));

  return elision ? forma.replace(elision[0], '') : forma;
};

export const agregarEnclitico = (forma: string, enclitico: string) => {
  const marcada = marcarTonica(forma);
  const elidida = elidir(marcada, enclitico);

  return resolverTilde(`${elidida}${enclitico}`);
};
