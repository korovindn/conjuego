import { describe, expect, it } from 'vitest';
import { expandirDiccionario } from './expandir-diccionario';
import { Diccionario } from '../types';

describe('expandirDiccionario', () => {
  it('crea entradas para los hijos', () => {
    const diccionario: Diccionario = new Map([
      ['mecer', { zc: false, hijos: ['remecer'] }],
    ]);

    expect(expandirDiccionario(diccionario).get('remecer')).toEqual({
      zc: false,
    });
  });

  it('no hereda abstracto ni hijos', () => {
    const diccionario: Diccionario = new Map([
      ['facer', { abstracto: true, zc: false, hijos: ['desfacer'] }],
    ]);
    const expandido = expandirDiccionario(diccionario);

    expect(expandido.get('desfacer')).toEqual({ zc: false });
    expect(expandido.get('facer')).toEqual({
      abstracto: true,
      zc: false,
      hijos: ['desfacer'],
    });
  });

  it('lo propio del hijo prevalece sobre lo heredado', () => {
    const diccionario: Diccionario = new Map([
      ['padre', { zc: false, participio: 'padrido', hijos: ['hijo'] }],
      ['hijo', { participio: 'hijido' }],
    ]);

    expect(expandirDiccionario(diccionario).get('hijo')).toEqual({
      zc: false,
      participio: 'hijido',
    });
  });

  it('el hijo puede anular el hiato heredado', () => {
    const diccionario: Diccionario = new Map([
      ['padre', { hiato: true, hijos: ['hijo'] }],
      ['hijo', { hiato: false }],
    ]);

    expect(expandirDiccionario(diccionario).get('hijo')).toEqual({
      hiato: false,
    });
  });

  it('no modifica el diccionario original', () => {
    const diccionario: Diccionario = new Map([
      ['mecer', { zc: false, hijos: ['remecer'] }],
    ]);

    expandirDiccionario(diccionario);

    expect(diccionario.has('remecer')).toBe(false);
  });
});
