import { marcarTonica, resolverTilde } from './tilde';

export const prefijar = (prefijo: string, forma: string) =>
  resolverTilde(`${prefijo}${marcarTonica(forma)}`);
