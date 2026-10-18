import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { aplicarFormas, configurar, conjuego } from './conjuego';
import {
  Alternancia,
  EntradaVerbo,
  Celda,
  FORMA_NO_PERSONAL,
  FormaNoPersonal,
  Modo,
  Polaridad,
  SubjuntivoImperfectoVariant,
  Tiempo,
} from './types';

describe('conjuego', () => {
  beforeEach(() => {
    configurar(new Map());
  });

  it('ordinario', () => {
    const tabla = conjuego('hablar');

    expect(
      tabla[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
    ).toBe('hablo');
    expect(
      tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
    ).toBe('hable');
    expect(
      tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][SubjuntivoImperfectoVariant.RA][
        Celda.PRIMERA_PLURAL
      ],
    ).toBe('habláramos');
    expect(
      tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA][Celda.SEGUNDA_SINGULAR],
    ).toBe('habla');
    expect(
      tabla[Modo.IMPERATIVO][Polaridad.NEGATIVA][Celda.SEGUNDA_PLURAL],
    ).toBe('habléis');
    expect(tabla[FORMA_NO_PERSONAL][FormaNoPersonal.INFINITIVO]).toBe('hablar');
  });

  it('pronominal', () => {
    const tabla = conjuego('lavarse');

    expect(tabla[Modo.INDICATIVO][Tiempo.PRESENTE]).toMatchObject({
      [Celda.PRIMERA_SINGULAR]: 'me lavo',
      [Celda.SEGUNDA_SINGULAR]: 'te lavas',
      [Celda.SEGUNDA_SINGULAR_VOSEO]: 'te lavás',
      [Celda.TERCERA_SINGULAR]: 'se lava',
      [Celda.PRIMERA_PLURAL]: 'nos lavamos',
      [Celda.SEGUNDA_PLURAL]: 'os laváis',
      [Celda.TERCERA_PLURAL]: 'se lavan',
    });
    expect(tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE][Celda.TERCERA_PLURAL]).toBe(
      'se laven',
    );
    expect(
      tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][SubjuntivoImperfectoVariant.RA][
        Celda.PRIMERA_PLURAL
      ],
    ).toBe('nos laváramos');
    expect(
      tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][SubjuntivoImperfectoVariant.SE][
        Celda.SEGUNDA_PLURAL
      ],
    ).toBe('os lavaseis');
    expect(
      tabla[Modo.IMPERATIVO][Polaridad.NEGATIVA][Celda.SEGUNDA_PLURAL],
    ).toBe('os lavéis');
    expect(tabla[FORMA_NO_PERSONAL][FormaNoPersonal.INFINITIVO]).toBe(
      'lavarse',
    );
    expect(tabla[FORMA_NO_PERSONAL][FormaNoPersonal.PARTICIPIO_PASADO]).toBe(
      'lavado',
    );
  });

  it.each([
    ['buscar', Tiempo.PRETERITO, Celda.PRIMERA_SINGULAR, 'busqué'],
    ['llegar', Tiempo.PRETERITO, Celda.PRIMERA_SINGULAR, 'llegué'],
    ['rezar', Tiempo.PRETERITO, Celda.PRIMERA_SINGULAR, 'recé'],
    ['averiguar', Tiempo.PRETERITO, Celda.PRIMERA_SINGULAR, 'averigüé'],
    ['vencer', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'venzo'],
    ['coger', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'cojo'],
    ['dirigir', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'dirijo'],
    ['distinguir', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'distingo'],
    ['leer', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'leemos'],
    ['leer', Tiempo.PRETERITO, Celda.SEGUNDA_SINGULAR, 'leíste'],
    ['leer', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'leyó'],
    ['leer', Tiempo.PRETERITO, Celda.PRIMERA_PLURAL, 'leímos'],
    ['creer', Tiempo.PRETERITO, Celda.TERCERA_PLURAL, 'creyeron'],
    ['leer', Tiempo.IMPERFECTO, Celda.PRIMERA_SINGULAR, 'leía'],
    ['leer', Tiempo.FUTURO, Celda.PRIMERA_SINGULAR, 'leeré'],
    ['gruñir', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'gruñó'],
    ['tañer', Tiempo.PRETERITO, Celda.TERCERA_PLURAL, 'tañeron'],
    ['argüir', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'arguyó'],
    ['argüir', Tiempo.PRETERITO, Celda.TERCERA_PLURAL, 'arguyeron'],
    ['argüir', Tiempo.PRETERITO, Celda.PRIMERA_PLURAL, 'argüimos'],
    ['conocer', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'conozco'],
    ['conocer', Tiempo.PRESENTE, Celda.SEGUNDA_SINGULAR, 'conoces'],
    ['lucir', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'luzco'],
    ['producir', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'produzco'],
  ] as const)(
    'ajuste ortográfico en indicativo de %s',
    (verbo, tiempo, celda, esperado) => {
      expect(conjuego(verbo)[Modo.INDICATIVO][tiempo][celda]).toBe(esperado);
    },
  );

  it('ajuste ortográfico en subjuntivo', () => {
    expect(
      conjuego('buscar')[Modo.SUBJUNTIVO][Tiempo.PRESENTE][
        Celda.PRIMERA_SINGULAR
      ],
    ).toBe('busque');
    expect(
      conjuego('vencer')[Modo.SUBJUNTIVO][Tiempo.PRESENTE][
        Celda.PRIMERA_PLURAL
      ],
    ).toBe('venzamos');
    expect(
      conjuego('leer')[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
        SubjuntivoImperfectoVariant.RA
      ][Celda.PRIMERA_PLURAL],
    ).toBe('leyéramos');
    expect(
      conjuego('gruñir')[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
        SubjuntivoImperfectoVariant.SE
      ][Celda.TERCERA_SINGULAR],
    ).toBe('gruñese');
    expect(conjuego('conocer')[Modo.SUBJUNTIVO][Tiempo.PRESENTE]).toEqual({
      [Celda.PRIMERA_SINGULAR]: 'conozca',
      [Celda.SEGUNDA_SINGULAR]: 'conozcas',
      [Celda.SEGUNDA_SINGULAR_VOSEO]: 'conozcas',
      [Celda.TERCERA_SINGULAR]: 'conozca',
      [Celda.PRIMERA_PLURAL]: 'conozcamos',
      [Celda.SEGUNDA_PLURAL]: 'conozcáis',
      [Celda.TERCERA_PLURAL]: 'conozcan',
    });
    expect(
      conjuego('argüir')[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
        SubjuntivoImperfectoVariant.RA
      ][Celda.PRIMERA_PLURAL],
    ).toBe('arguyéramos');
  });

  describe('zc desactivado en el diccionario', () => {
    beforeEach(() => {
      configurar(
        new Map([
          ['mecer', { zc: false }],
          ['cocer', { zc: false }],
        ]),
      );
    });

    it.each([
      ['mecer', 'mezo', 'meza'],
      ['mecerse', 'me mezo', 'me meza'],
      ['cocer', 'cozo', 'coza'],
      ['conocer', 'conozco', 'conozca'],
    ])('%s', (verbo, presente, subjuntivo) => {
      const tabla = conjuego(verbo);

      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toBe(presente);
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toBe(subjuntivo);
    });
  });

  describe('hijos', () => {
    beforeEach(() => {
      configurar(
        new Map([
          ['mecer', { zc: false, hijos: ['remecer'] }],
          ['facer', { abstracto: true, zc: false, hijos: ['satisfacer'] }],
          ['ver', { hijos: ['prever'] }],
        ]),
      );
    });

    it('conserva la sílaba tónica del padre', () => {
      const tabla = conjuego('prever');

      expect(tabla[Modo.INDICATIVO][Tiempo.PRESENTE]).toMatchObject({
        [Celda.SEGUNDA_SINGULAR]: 'prevés',
        [Celda.SEGUNDA_PLURAL]: 'prevéis',
        [Celda.TERCERA_PLURAL]: 'prevén',
      });
      expect(
        tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA][Celda.SEGUNDA_SINGULAR],
      ).toBe('prevé');
    });

    it.each([
      ['remecer', 'remezo', 'remeza'],
      ['remecerse', 'me remezo', 'me remeza'],
      ['satisfacer', 'satisfazo', 'satisfaza'],
    ])('%s hereda del padre', (verbo, presente, subjuntivo) => {
      const tabla = conjuego(verbo);

      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toBe(presente);
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toBe(subjuntivo);
    });
  });

  describe('alternancia', () => {
    beforeEach(() => {
      configurar(
        new Map([
          ['pensar', { alternancia: Alternancia.E_IE, hijos: ['repensar'] }],
          ['perder', { alternancia: Alternancia.E_IE }],
          ['sentar', { alternancia: Alternancia.E_IE }],
          ['contar', { alternancia: Alternancia.O_UE }],
          ['volver', { alternancia: Alternancia.O_UE }],
          ['almorzar', { alternancia: Alternancia.O_UE }],
          ['colgar', { alternancia: Alternancia.O_UE }],
          ['cocer', { alternancia: Alternancia.O_UE, zc: false }],
          ['avergonzar', { alternancia: Alternancia.O_UE }],
          ['jugar', { alternancia: Alternancia.U_UE }],
          ['adquirir', { alternancia: Alternancia.I_IE }],
          ['sentir', { alternancia: Alternancia.E_IE_I }],
          ['dormir', { alternancia: Alternancia.O_UE_U }],
          ['pedir', { alternancia: Alternancia.E_I }],
          ['seguir', { alternancia: Alternancia.E_I }],
          ['elegir', { alternancia: Alternancia.E_I }],
          ['reñir', { alternancia: Alternancia.E_I }],
          ['oler', { alternancia: Alternancia.O_HUE, hijos: ['maloler'] }],
          ['desosar', { alternancia: Alternancia.O_HUE }],
          ['errar', { alternancia: Alternancia.E_YE }],
        ]),
      );
    });

    it('pensar (e>ie) en toda la tabla', () => {
      const tabla = conjuego('pensar');

      expect(tabla[Modo.INDICATIVO][Tiempo.PRESENTE]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'pienso',
        [Celda.SEGUNDA_SINGULAR]: 'piensas',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'pensás',
        [Celda.TERCERA_SINGULAR]: 'piensa',
        [Celda.PRIMERA_PLURAL]: 'pensamos',
        [Celda.SEGUNDA_PLURAL]: 'pensáis',
        [Celda.TERCERA_PLURAL]: 'piensan',
      });
      expect(tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'piense',
        [Celda.SEGUNDA_SINGULAR]: 'pienses',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'pienses',
        [Celda.TERCERA_SINGULAR]: 'piense',
        [Celda.PRIMERA_PLURAL]: 'pensemos',
        [Celda.SEGUNDA_PLURAL]: 'penséis',
        [Celda.TERCERA_PLURAL]: 'piensen',
      });
      expect(tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA]).toEqual({
        [Celda.SEGUNDA_SINGULAR]: 'piensa',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'pensá',
        [Celda.TERCERA_SINGULAR]: 'piense',
        [Celda.PRIMERA_PLURAL]: 'pensemos',
        [Celda.SEGUNDA_PLURAL]: 'pensad',
        [Celda.TERCERA_PLURAL]: 'piensen',
      });
      expect(
        tabla[Modo.IMPERATIVO][Polaridad.NEGATIVA][Celda.SEGUNDA_SINGULAR],
      ).toBe('pienses');
      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRETERITO][Celda.PRIMERA_SINGULAR],
      ).toBe('pensé');
      expect(
        tabla[Modo.INDICATIVO][Tiempo.IMPERFECTO][Celda.PRIMERA_SINGULAR],
      ).toBe('pensaba');
      expect(
        tabla[Modo.INDICATIVO][Tiempo.FUTURO][Celda.PRIMERA_SINGULAR],
      ).toBe('pensaré');
      expect(
        tabla[Modo.INDICATIVO][Tiempo.CONDICIONAL][Celda.PRIMERA_SINGULAR],
      ).toBe('pensaría');
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
          SubjuntivoImperfectoVariant.RA
        ][Celda.PRIMERA_SINGULAR],
      ).toBe('pensara');
      expect(tabla[FORMA_NO_PERSONAL]).toEqual({
        [FormaNoPersonal.INFINITIVO]: 'pensar',
        [FormaNoPersonal.GERUNDIO]: 'pensando',
        [FormaNoPersonal.PARTICIPIO_PASADO]: 'pensado',
      });
    });

    it('sentir (e>ie/i) en toda la tabla', () => {
      const tabla = conjuego('sentir');

      expect(tabla[Modo.INDICATIVO][Tiempo.PRESENTE]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'siento',
        [Celda.SEGUNDA_SINGULAR]: 'sientes',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'sentís',
        [Celda.TERCERA_SINGULAR]: 'siente',
        [Celda.PRIMERA_PLURAL]: 'sentimos',
        [Celda.SEGUNDA_PLURAL]: 'sentís',
        [Celda.TERCERA_PLURAL]: 'sienten',
      });
      expect(tabla[Modo.INDICATIVO][Tiempo.PRETERITO]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'sentí',
        [Celda.SEGUNDA_SINGULAR]: 'sentiste',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'sentiste',
        [Celda.TERCERA_SINGULAR]: 'sintió',
        [Celda.PRIMERA_PLURAL]: 'sentimos',
        [Celda.SEGUNDA_PLURAL]: 'sentisteis',
        [Celda.TERCERA_PLURAL]: 'sintieron',
      });
      expect(tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'sienta',
        [Celda.SEGUNDA_SINGULAR]: 'sientas',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'sientas',
        [Celda.TERCERA_SINGULAR]: 'sienta',
        [Celda.PRIMERA_PLURAL]: 'sintamos',
        [Celda.SEGUNDA_PLURAL]: 'sintáis',
        [Celda.TERCERA_PLURAL]: 'sientan',
      });
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
          SubjuntivoImperfectoVariant.RA
        ][Celda.PRIMERA_SINGULAR],
      ).toBe('sintiera');
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
          SubjuntivoImperfectoVariant.SE
        ][Celda.PRIMERA_PLURAL],
      ).toBe('sintiésemos');
      expect(tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA]).toEqual({
        [Celda.SEGUNDA_SINGULAR]: 'siente',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'sentí',
        [Celda.TERCERA_SINGULAR]: 'sienta',
        [Celda.PRIMERA_PLURAL]: 'sintamos',
        [Celda.SEGUNDA_PLURAL]: 'sentid',
        [Celda.TERCERA_PLURAL]: 'sientan',
      });
      expect(
        tabla[Modo.INDICATIVO][Tiempo.IMPERFECTO][Celda.PRIMERA_SINGULAR],
      ).toBe('sentía');
      expect(
        tabla[Modo.INDICATIVO][Tiempo.FUTURO][Celda.PRIMERA_SINGULAR],
      ).toBe('sentiré');
      expect(tabla[FORMA_NO_PERSONAL]).toEqual({
        [FormaNoPersonal.INFINITIVO]: 'sentir',
        [FormaNoPersonal.GERUNDIO]: 'sintiendo',
        [FormaNoPersonal.PARTICIPIO_PASADO]: 'sentido',
      });
    });

    it.each([
      ['perder', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'pierdo'],
      ['perder', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'perdemos'],
      ['perder', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'perdió'],
      ['contar', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'cuento'],
      ['contar', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'contamos'],
      ['contar', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'contó'],
      ['volver', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'vuelvo'],
      ['volver', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'volvemos'],
      ['almorzar', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'almuerzo'],
      ['almorzar', Tiempo.PRETERITO, Celda.PRIMERA_SINGULAR, 'almorcé'],
      ['colgar', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'cuelgo'],
      ['cocer', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'cuezo'],
      ['cocer', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'cocemos'],
      ['avergonzar', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'avergüenzo'],
      ['avergonzar', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'avergonzamos'],
      ['jugar', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'juego'],
      ['jugar', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'jugamos'],
      ['jugar', Tiempo.PRETERITO, Celda.PRIMERA_SINGULAR, 'jugué'],
      ['adquirir', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'adquiero'],
      ['adquirir', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'adquirimos'],
      ['adquirir', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'adquirió'],
      ['dormir', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'duermo'],
      ['dormir', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'dormimos'],
      ['dormir', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'durmió'],
      ['dormir', Tiempo.PRETERITO, Celda.PRIMERA_PLURAL, 'dormimos'],
      ['pedir', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'pido'],
      ['pedir', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'pedimos'],
      ['pedir', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'pidió'],
      ['pedir', Tiempo.IMPERFECTO, Celda.PRIMERA_SINGULAR, 'pedía'],
      ['seguir', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'sigo'],
      ['seguir', Tiempo.PRESENTE, Celda.SEGUNDA_SINGULAR, 'sigues'],
      ['seguir', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'siguió'],
      ['elegir', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'elijo'],
      ['elegir', Tiempo.PRESENTE, Celda.SEGUNDA_SINGULAR, 'eliges'],
      ['elegir', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'eligió'],
      ['reñir', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'riño'],
      ['reñir', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'riñó'],
      ['oler', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'huelo'],
      ['oler', Tiempo.PRESENTE, Celda.SEGUNDA_SINGULAR, 'hueles'],
      ['oler', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'olemos'],
      ['oler', Tiempo.PRETERITO, Celda.TERCERA_SINGULAR, 'olió'],
      ['maloler', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'malhuelo'],
      ['maloler', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'malolemos'],
      ['desosar', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'deshueso'],
      ['desosar', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'desosamos'],
      ['errar', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'yerro'],
      ['errar', Tiempo.PRESENTE, Celda.PRIMERA_PLURAL, 'erramos'],
      ['repensar', Tiempo.PRESENTE, Celda.PRIMERA_SINGULAR, 'repienso'],
    ] as const)('indicativo de %s', (verbo, tiempo, celda, esperado) => {
      expect(conjuego(verbo)[Modo.INDICATIVO][tiempo][celda]).toBe(esperado);
    });

    it.each([
      ['perder', Celda.PRIMERA_SINGULAR, 'pierda'],
      ['contar', Celda.PRIMERA_SINGULAR, 'cuente'],
      ['volver', Celda.PRIMERA_SINGULAR, 'vuelva'],
      ['almorzar', Celda.PRIMERA_SINGULAR, 'almuerce'],
      ['colgar', Celda.PRIMERA_SINGULAR, 'cuelgue'],
      ['cocer', Celda.PRIMERA_SINGULAR, 'cueza'],
      ['avergonzar', Celda.PRIMERA_SINGULAR, 'avergüence'],
      ['jugar', Celda.PRIMERA_SINGULAR, 'juegue'],
      ['adquirir', Celda.PRIMERA_SINGULAR, 'adquiera'],
      ['dormir', Celda.PRIMERA_SINGULAR, 'duerma'],
      ['dormir', Celda.PRIMERA_PLURAL, 'durmamos'],
      ['pedir', Celda.PRIMERA_SINGULAR, 'pida'],
      ['pedir', Celda.PRIMERA_PLURAL, 'pidamos'],
      ['seguir', Celda.PRIMERA_SINGULAR, 'siga'],
      ['seguir', Celda.PRIMERA_PLURAL, 'sigamos'],
      ['elegir', Celda.PRIMERA_SINGULAR, 'elija'],
      ['oler', Celda.PRIMERA_SINGULAR, 'huela'],
      ['desosar', Celda.PRIMERA_SINGULAR, 'deshuese'],
      ['errar', Celda.PRIMERA_SINGULAR, 'yerre'],
    ] as const)('subjuntivo presente de %s', (verbo, celda, esperado) => {
      expect(conjuego(verbo)[Modo.SUBJUNTIVO][Tiempo.PRESENTE][celda]).toBe(
        esperado,
      );
    });

    it.each([
      ['dormir', FormaNoPersonal.GERUNDIO, 'durmiendo'],
      ['dormir', FormaNoPersonal.PARTICIPIO_PASADO, 'dormido'],
      ['pedir', FormaNoPersonal.GERUNDIO, 'pidiendo'],
      ['pedir', FormaNoPersonal.PARTICIPIO_PASADO, 'pedido'],
      ['reñir', FormaNoPersonal.GERUNDIO, 'riñendo'],
      ['contar', FormaNoPersonal.GERUNDIO, 'contando'],
    ] as const)('forma no personal de %s: %s', (verbo, forma, esperado) => {
      expect(conjuego(verbo)[FORMA_NO_PERSONAL][forma]).toBe(esperado);
    });

    it('imperativo de pedir', () => {
      const imperativo = conjuego('pedir')[Modo.IMPERATIVO];

      expect(imperativo[Polaridad.AFIRMATIVA][Celda.SEGUNDA_SINGULAR]).toBe(
        'pide',
      );
      expect(
        imperativo[Polaridad.AFIRMATIVA][Celda.SEGUNDA_SINGULAR_VOSEO],
      ).toBe('pedí');
      expect(imperativo[Polaridad.AFIRMATIVA][Celda.PRIMERA_PLURAL]).toBe(
        'pidamos',
      );
      expect(imperativo[Polaridad.AFIRMATIVA][Celda.SEGUNDA_PLURAL]).toBe(
        'pedid',
      );
      expect(imperativo[Polaridad.NEGATIVA][Celda.SEGUNDA_SINGULAR]).toBe(
        'pidas',
      );
    });

    it('pronominales', () => {
      const sentarse = conjuego('sentarse');
      const dormirse = conjuego('dormirse');

      expect(
        sentarse[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toBe('me siento');
      expect(sentarse[Modo.IMPERATIVO][Polaridad.AFIRMATIVA]).toMatchObject({
        [Celda.SEGUNDA_SINGULAR]: 'siéntate',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'sentate',
        [Celda.PRIMERA_PLURAL]: 'sentémonos',
        [Celda.SEGUNDA_PLURAL]: 'sentaos',
      });
      expect(
        dormirse[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toBe('me duermo');
      expect(dormirse[Modo.IMPERATIVO][Polaridad.AFIRMATIVA]).toMatchObject({
        [Celda.SEGUNDA_SINGULAR]: 'duérmete',
        [Celda.PRIMERA_PLURAL]: 'durmámonos',
        [Celda.SEGUNDA_PLURAL]: 'dormíos',
      });
      expect(dormirse[FORMA_NO_PERSONAL][FormaNoPersonal.GERUNDIO]).toBe(
        'durmiéndose',
      );
    });
  });

  it('ajuste ortográfico en imperativo', () => {
    const buscar = conjuego('buscar')[Modo.IMPERATIVO];
    const leer = conjuego('leer')[Modo.IMPERATIVO];

    expect(buscar[Polaridad.AFIRMATIVA][Celda.TERCERA_SINGULAR]).toBe('busque');
    expect(buscar[Polaridad.NEGATIVA][Celda.SEGUNDA_SINGULAR]).toBe('busques');
    expect(leer[Polaridad.AFIRMATIVA][Celda.SEGUNDA_SINGULAR]).toBe('lee');
    expect(leer[Polaridad.AFIRMATIVA][Celda.SEGUNDA_PLURAL]).toBe('leed');
  });

  it.each([
    ['leer', FormaNoPersonal.GERUNDIO, 'leyendo'],
    ['leer', FormaNoPersonal.PARTICIPIO_PASADO, 'leído'],
    ['gruñir', FormaNoPersonal.GERUNDIO, 'gruñendo'],
    ['reír', FormaNoPersonal.INFINITIVO, 'reír'],
    ['reírse', FormaNoPersonal.INFINITIVO, 'reírse'],
  ] as const)('ajuste ortográfico en %s: %s', (verbo, forma, esperado) => {
    expect(conjuego(verbo)[FORMA_NO_PERSONAL][forma]).toBe(esperado);
  });

  it.each([
    [
      'lavarse',
      {
        [Celda.SEGUNDA_SINGULAR]: 'lávate',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'lavate',
        [Celda.TERCERA_SINGULAR]: 'lávese',
        [Celda.PRIMERA_PLURAL]: 'lavémonos',
        [Celda.SEGUNDA_PLURAL]: 'lavaos',
        [Celda.TERCERA_PLURAL]: 'lávense',
      },
    ],
    [
      'comerse',
      {
        [Celda.SEGUNDA_SINGULAR]: 'cómete',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'comete',
        [Celda.TERCERA_SINGULAR]: 'cómase',
        [Celda.PRIMERA_PLURAL]: 'comámonos',
        [Celda.SEGUNDA_PLURAL]: 'comeos',
        [Celda.TERCERA_PLURAL]: 'cómanse',
      },
    ],
    [
      'aburrirse',
      {
        [Celda.SEGUNDA_SINGULAR]: 'abúrrete',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'aburrite',
        [Celda.TERCERA_SINGULAR]: 'abúrrase',
        [Celda.PRIMERA_PLURAL]: 'aburrámonos',
        [Celda.SEGUNDA_PLURAL]: 'aburríos',
        [Celda.TERCERA_PLURAL]: 'abúrranse',
      },
    ],
  ] as const)('imperativo afirmativo pronominal de %s', (verbo, esperado) => {
    expect(
      conjuego(verbo)[Modo.IMPERATIVO][Polaridad.AFIRMATIVA],
    ).toMatchObject(esperado);
  });

  it('imperativo negativo pronominal conserva los proclíticos', () => {
    expect(
      conjuego('lavarse')[Modo.IMPERATIVO][Polaridad.NEGATIVA],
    ).toMatchObject({
      [Celda.SEGUNDA_SINGULAR]: 'te laves',
      [Celda.SEGUNDA_SINGULAR_VOSEO]: 'te laves',
      [Celda.TERCERA_SINGULAR]: 'se lave',
      [Celda.PRIMERA_PLURAL]: 'nos lavemos',
      [Celda.SEGUNDA_PLURAL]: 'os lavéis',
      [Celda.TERCERA_PLURAL]: 'se laven',
    });
  });

  it.each([
    ['lavarse', 'lavándose'],
    ['comerse', 'comiéndose'],
    ['aburrirse', 'aburriéndose'],
  ])('gerundio pronominal de %s', (verbo, esperado) => {
    expect(conjuego(verbo)[FORMA_NO_PERSONAL][FormaNoPersonal.GERUNDIO]).toBe(
      esperado,
    );
  });

  it.each([
    [
      'huir',
      ['huyo', 'huyes', 'huis', 'huye', 'huimos', 'huis', 'huyen'],
      ['huya', 'huyas', 'huyas', 'huya', 'huyamos', 'huyáis', 'huyan'],
    ],
    [
      'construir',
      [
        'construyo',
        'construyes',
        'construís',
        'construye',
        'construimos',
        'construís',
        'construyen',
      ],
      [
        'construya',
        'construyas',
        'construyas',
        'construya',
        'construyamos',
        'construyáis',
        'construyan',
      ],
    ],
  ])('-uir inserta y: %s', (verbo, indicativo, subjuntivo) => {
    const tabla = conjuego(verbo);

    expect(Object.values(tabla[Modo.INDICATIVO][Tiempo.PRESENTE])).toEqual(
      indicativo,
    );
    expect(Object.values(tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE])).toEqual(
      subjuntivo,
    );
  });

  describe('hiato', () => {
    beforeEach(() => {
      configurar(
        new Map([
          ['enviar', { hiato: true, hijos: ['reenviar'] }],
          ['actuar', { hiato: true }],
          ['reunir', { hiato: true }],
          ['prohibir', { hiato: true }],
          ['rehuir', { hiato: true }],
          [
            'reír',
            { alternancia: Alternancia.E_I, hiato: true, hijos: ['sonreír'] },
          ],
          ['freír', { alternancia: Alternancia.E_I, hiato: true }],
          ['desleír', { alternancia: Alternancia.E_I, hiato: true }],
        ]),
      );
    });

    it('enviar en toda la tabla', () => {
      const tabla = conjuego('enviar');

      expect(tabla[Modo.INDICATIVO][Tiempo.PRESENTE]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'envío',
        [Celda.SEGUNDA_SINGULAR]: 'envías',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'enviás',
        [Celda.TERCERA_SINGULAR]: 'envía',
        [Celda.PRIMERA_PLURAL]: 'enviamos',
        [Celda.SEGUNDA_PLURAL]: 'enviáis',
        [Celda.TERCERA_PLURAL]: 'envían',
      });
      expect(tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'envíe',
        [Celda.SEGUNDA_SINGULAR]: 'envíes',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'envíes',
        [Celda.TERCERA_SINGULAR]: 'envíe',
        [Celda.PRIMERA_PLURAL]: 'enviemos',
        [Celda.SEGUNDA_PLURAL]: 'enviéis',
        [Celda.TERCERA_PLURAL]: 'envíen',
      });
      expect(tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA]).toEqual({
        [Celda.SEGUNDA_SINGULAR]: 'envía',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'enviá',
        [Celda.TERCERA_SINGULAR]: 'envíe',
        [Celda.PRIMERA_PLURAL]: 'enviemos',
        [Celda.SEGUNDA_PLURAL]: 'enviad',
        [Celda.TERCERA_PLURAL]: 'envíen',
      });
      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRETERITO][Celda.PRIMERA_SINGULAR],
      ).toBe('envié');
      expect(tabla[FORMA_NO_PERSONAL]).toEqual({
        [FormaNoPersonal.INFINITIVO]: 'enviar',
        [FormaNoPersonal.GERUNDIO]: 'enviando',
        [FormaNoPersonal.PARTICIPIO_PASADO]: 'enviado',
      });
    });

    it('actuar en presente', () => {
      const tabla = conjuego('actuar');

      expect(tabla[Modo.INDICATIVO][Tiempo.PRESENTE]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'actúo',
        [Celda.SEGUNDA_SINGULAR]: 'actúas',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'actuás',
        [Celda.TERCERA_SINGULAR]: 'actúa',
        [Celda.PRIMERA_PLURAL]: 'actuamos',
        [Celda.SEGUNDA_PLURAL]: 'actuáis',
        [Celda.TERCERA_PLURAL]: 'actúan',
      });
      expect(tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'actúe',
        [Celda.SEGUNDA_SINGULAR]: 'actúes',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'actúes',
        [Celda.TERCERA_SINGULAR]: 'actúe',
        [Celda.PRIMERA_PLURAL]: 'actuemos',
        [Celda.SEGUNDA_PLURAL]: 'actuéis',
        [Celda.TERCERA_PLURAL]: 'actúen',
      });
    });

    it.each([
      ['reunir', Celda.PRIMERA_SINGULAR, 'reúno'],
      ['reunir', Celda.PRIMERA_PLURAL, 'reunimos'],
      ['prohibir', Celda.TERCERA_SINGULAR, 'prohíbe'],
      ['prohibir', Celda.SEGUNDA_PLURAL, 'prohibís'],
      ['reenviar', Celda.PRIMERA_SINGULAR, 'reenvío'],
      ['reírse', Celda.PRIMERA_SINGULAR, 'me río'],
      ['reír', Celda.TERCERA_PLURAL, 'ríen'],
      ['reír', Celda.PRIMERA_PLURAL, 'reímos'],
      ['sonreír', Celda.PRIMERA_SINGULAR, 'sonrío'],
      ['desleír', Celda.PRIMERA_SINGULAR, 'deslío'],
      ['rehuir', Celda.PRIMERA_SINGULAR, 'rehúyo'],
      ['rehuir', Celda.TERCERA_PLURAL, 'rehúyen'],
      ['rehuir', Celda.PRIMERA_PLURAL, 'rehuimos'],
    ] as const)('presente de %s: %s', (verbo, celda, esperado) => {
      expect(conjuego(verbo)[Modo.INDICATIVO][Tiempo.PRESENTE][celda]).toBe(
        esperado,
      );
    });

    it.each([
      ['rehuir', Celda.PRIMERA_SINGULAR, 'rehúya'],
      ['rehuir', Celda.PRIMERA_PLURAL, 'rehuyamos'],
      ['reír', Celda.PRIMERA_SINGULAR, 'ría'],
      ['reír', Celda.SEGUNDA_PLURAL, 'riais'],
    ] as const)('subjuntivo presente de %s: %s', (verbo, celda, esperado) => {
      expect(conjuego(verbo)[Modo.SUBJUNTIVO][Tiempo.PRESENTE][celda]).toBe(
        esperado,
      );
    });

    it('reír sin i duplicada', () => {
      const tabla = conjuego('reír');

      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRETERITO][Celda.TERCERA_SINGULAR],
      ).toBe('rio');
      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRETERITO][Celda.TERCERA_PLURAL],
      ).toBe('rieron');
      expect(tabla[FORMA_NO_PERSONAL][FormaNoPersonal.GERUNDIO]).toBe('riendo');
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
          SubjuntivoImperfectoVariant.RA
        ][Celda.PRIMERA_SINGULAR],
      ).toBe('riera');
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
          SubjuntivoImperfectoVariant.SE
        ][Celda.PRIMERA_SINGULAR],
      ).toBe('riese');
      expect(
        conjuego('sonreír')[Modo.INDICATIVO][Tiempo.PRETERITO][
          Celda.TERCERA_SINGULAR
        ],
      ).toBe('sonrió');
      expect(
        conjuego('freír')[Modo.INDICATIVO][Tiempo.PRETERITO][
          Celda.TERCERA_PLURAL
        ],
      ).toBe('frieron');
    });

    it('enclíticos', () => {
      expect(
        conjuego('reunirse')[Modo.IMPERATIVO][Polaridad.AFIRMATIVA],
      ).toMatchObject({
        [Celda.SEGUNDA_SINGULAR]: 'reúnete',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'reunite',
        [Celda.PRIMERA_PLURAL]: 'reunámonos',
        [Celda.TERCERA_PLURAL]: 'reúnanse',
      });
      expect(
        conjuego('reírse')[Modo.IMPERATIVO][Polaridad.AFIRMATIVA][
          Celda.SEGUNDA_SINGULAR
        ],
      ).toBe('ríete');
    });
  });

  describe('irregulares', () => {
    beforeEach(() => {
      configurar(
        new Map<string, EntradaVerbo>([
          [
            'tener',
            {
              alternancia: Alternancia.E_IE,
              raices: { presente: 'teng', preterito: 'tuv', futuro: 'tendr' },
              formas: {
                [Modo.IMPERATIVO]: {
                  [Polaridad.AFIRMATIVA]: { [Celda.SEGUNDA_SINGULAR]: 'ten' },
                },
              },
              hijos: ['detener'],
            },
          ],
          [
            'decir',
            {
              alternancia: Alternancia.E_I,
              raices: { presente: 'dig', preterito: 'dij', futuro: 'dir' },
              formas: {
                [Modo.IMPERATIVO]: {
                  [Polaridad.AFIRMATIVA]: { [Celda.SEGUNDA_SINGULAR]: 'di' },
                },
                [FORMA_NO_PERSONAL]: {
                  [FormaNoPersonal.PARTICIPIO_PASADO]: 'dicho',
                },
              },
              hijos: ['interdecir'],
            },
          ],
          [
            'interdecir',
            {
              formas: {
                [Modo.IMPERATIVO]: {
                  [Polaridad.AFIRMATIVA]: {
                    [Celda.SEGUNDA_SINGULAR]: 'interdice',
                  },
                },
              },
            },
          ],
          [
            'hacer',
            {
              zc: false,
              raices: { presente: 'hag', preterito: 'hic', futuro: 'har' },
              formas: {
                [Modo.INDICATIVO]: {
                  [Tiempo.PRETERITO]: { [Celda.TERCERA_SINGULAR]: 'hizo' },
                },
                [Modo.IMPERATIVO]: {
                  [Polaridad.AFIRMATIVA]: { [Celda.SEGUNDA_SINGULAR]: 'haz' },
                },
                [FORMA_NO_PERSONAL]: {
                  [FormaNoPersonal.PARTICIPIO_PASADO]: 'hecho',
                },
              },
              hijos: ['deshacer'],
            },
          ],
          [
            'dar',
            {
              formas: {
                [Modo.INDICATIVO]: {
                  [Tiempo.PRESENTE]: { [Celda.PRIMERA_SINGULAR]: 'doy' },
                },
                [Modo.SUBJUNTIVO]: {
                  [Tiempo.PRESENTE]: {
                    [Celda.PRIMERA_SINGULAR]: 'dé',
                    [Celda.TERCERA_SINGULAR]: 'dé',
                  },
                },
              },
            },
          ],
          [
            'oír',
            {
              raices: { presente: 'oig' },
              formas: {
                [Modo.INDICATIVO]: {
                  [Tiempo.PRESENTE]: {
                    [Celda.SEGUNDA_SINGULAR]: 'oyes',
                    [Celda.TERCERA_SINGULAR]: 'oye',
                    [Celda.TERCERA_PLURAL]: 'oyen',
                  },
                },
              },
            },
          ],
          [
            'roer',
            {
              raices: { presente: ['ro', 'roig', 'roy'] },
              hijos: ['corroer'],
            },
          ],
          [
            'soler',
            {
              alternancia: Alternancia.O_UE,
              formas: {
                [Modo.INDICATIVO]: {
                  [Tiempo.FUTURO]: { [Celda.PRIMERA_SINGULAR]: null },
                },
              },
            },
          ],
        ]),
      );
    });

    it('tener en toda la tabla', () => {
      const tabla = conjuego('tener');

      expect(tabla[Modo.INDICATIVO][Tiempo.PRESENTE]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'tengo',
        [Celda.SEGUNDA_SINGULAR]: 'tienes',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'tenés',
        [Celda.TERCERA_SINGULAR]: 'tiene',
        [Celda.PRIMERA_PLURAL]: 'tenemos',
        [Celda.SEGUNDA_PLURAL]: 'tenéis',
        [Celda.TERCERA_PLURAL]: 'tienen',
      });
      expect(tabla[Modo.INDICATIVO][Tiempo.PRETERITO]).toEqual({
        [Celda.PRIMERA_SINGULAR]: 'tuve',
        [Celda.SEGUNDA_SINGULAR]: 'tuviste',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'tuviste',
        [Celda.TERCERA_SINGULAR]: 'tuvo',
        [Celda.PRIMERA_PLURAL]: 'tuvimos',
        [Celda.SEGUNDA_PLURAL]: 'tuvisteis',
        [Celda.TERCERA_PLURAL]: 'tuvieron',
      });
      expect(tabla[Modo.INDICATIVO][Tiempo.FUTURO]).toMatchObject({
        [Celda.PRIMERA_SINGULAR]: 'tendré',
        [Celda.PRIMERA_PLURAL]: 'tendremos',
      });
      expect(tabla[Modo.INDICATIVO][Tiempo.CONDICIONAL]).toMatchObject({
        [Celda.PRIMERA_SINGULAR]: 'tendría',
        [Celda.PRIMERA_PLURAL]: 'tendríamos',
      });
      expect(tabla[Modo.INDICATIVO][Tiempo.IMPERFECTO]).toMatchObject({
        [Celda.PRIMERA_SINGULAR]: 'tenía',
      });
      expect(tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE]).toMatchObject({
        [Celda.PRIMERA_SINGULAR]: 'tenga',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'tengas',
        [Celda.PRIMERA_PLURAL]: 'tengamos',
      });
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
          SubjuntivoImperfectoVariant.RA
        ],
      ).toMatchObject({
        [Celda.PRIMERA_SINGULAR]: 'tuviera',
        [Celda.PRIMERA_PLURAL]: 'tuviéramos',
      });
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
          SubjuntivoImperfectoVariant.SE
        ][Celda.TERCERA_PLURAL],
      ).toBe('tuviesen');
      expect(tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA]).toEqual({
        [Celda.SEGUNDA_SINGULAR]: 'ten',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'tené',
        [Celda.TERCERA_SINGULAR]: 'tenga',
        [Celda.PRIMERA_PLURAL]: 'tengamos',
        [Celda.SEGUNDA_PLURAL]: 'tened',
        [Celda.TERCERA_PLURAL]: 'tengan',
      });
      expect(tabla[FORMA_NO_PERSONAL]).toEqual({
        [FormaNoPersonal.INFINITIVO]: 'tener',
        [FormaNoPersonal.GERUNDIO]: 'teniendo',
        [FormaNoPersonal.PARTICIPIO_PASADO]: 'tenido',
      });
    });

    it('detener hereda raíces y formas', () => {
      const tabla = conjuego('detener');

      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toBe('detengo');
      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRETERITO][Celda.TERCERA_SINGULAR],
      ).toBe('detuvo');
      expect(
        tabla[Modo.INDICATIVO][Tiempo.FUTURO][Celda.PRIMERA_SINGULAR],
      ).toBe('detendré');
      expect(
        tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA][Celda.SEGUNDA_SINGULAR],
      ).toBe('detén');
    });

    it('detenerse', () => {
      const tabla = conjuego('detenerse');

      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRETERITO][Celda.PRIMERA_SINGULAR],
      ).toBe('me detuve');
      expect(
        tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA][Celda.SEGUNDA_SINGULAR],
      ).toBe('detente');
    });

    it('decir: pretérito fuerte en j', () => {
      const tabla = conjuego('decir');

      expect(tabla[Modo.INDICATIVO][Tiempo.PRESENTE]).toMatchObject({
        [Celda.PRIMERA_SINGULAR]: 'digo',
        [Celda.SEGUNDA_SINGULAR]: 'dices',
        [Celda.PRIMERA_PLURAL]: 'decimos',
      });
      expect(tabla[Modo.INDICATIVO][Tiempo.PRETERITO]).toMatchObject({
        [Celda.PRIMERA_SINGULAR]: 'dije',
        [Celda.TERCERA_SINGULAR]: 'dijo',
        [Celda.TERCERA_PLURAL]: 'dijeron',
      });
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.IMPERFECTO][
          SubjuntivoImperfectoVariant.SE
        ],
      ).toMatchObject({
        [Celda.PRIMERA_SINGULAR]: 'dijese',
        [Celda.PRIMERA_PLURAL]: 'dijésemos',
      });
      expect(
        tabla[Modo.INDICATIVO][Tiempo.FUTURO][Celda.PRIMERA_SINGULAR],
      ).toBe('diré');
      expect(tabla[FORMA_NO_PERSONAL]).toEqual({
        [FormaNoPersonal.INFINITIVO]: 'decir',
        [FormaNoPersonal.GERUNDIO]: 'diciendo',
        [FormaNoPersonal.PARTICIPIO_PASADO]: 'dicho',
      });
    });

    it('formas del hijo prevalecen sobre las del padre', () => {
      const tabla = conjuego('interdecir');

      expect(
        tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA][Celda.SEGUNDA_SINGULAR],
      ).toBe('interdice');
      expect(tabla[FORMA_NO_PERSONAL][FormaNoPersonal.PARTICIPIO_PASADO]).toBe(
        'interdicho',
      );
    });

    it.each([
      ['hacer', 'hago', 'hice', 'hizo', 'haré', 'haz', 'hecho'],
      [
        'deshacer',
        'deshago',
        'deshice',
        'deshizo',
        'desharé',
        'deshaz',
        'deshecho',
      ],
    ])(
      '%s',
      (verbo, presente, preterito, tercera, futuro, imperativo, participio) => {
        const tabla = conjuego(verbo);

        expect(
          tabla[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
        ).toBe(presente);
        expect(tabla[Modo.INDICATIVO][Tiempo.PRETERITO]).toMatchObject({
          [Celda.PRIMERA_SINGULAR]: preterito,
          [Celda.TERCERA_SINGULAR]: tercera,
        });
        expect(
          tabla[Modo.INDICATIVO][Tiempo.FUTURO][Celda.PRIMERA_SINGULAR],
        ).toBe(futuro);
        expect(
          tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA][Celda.SEGUNDA_SINGULAR],
        ).toBe(imperativo);
        expect(
          tabla[FORMA_NO_PERSONAL][FormaNoPersonal.PARTICIPIO_PASADO],
        ).toBe(participio);
      },
    );

    it('dar: el subjuntivo se extiende al imperativo', () => {
      const tabla = conjuego('dar');

      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toBe('doy');
      expect(tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA]).toMatchObject({
        [Celda.SEGUNDA_SINGULAR]: 'da',
        [Celda.TERCERA_SINGULAR]: 'dé',
      });
      expect(tabla[Modo.IMPERATIVO][Polaridad.NEGATIVA]).toMatchObject({
        [Celda.SEGUNDA_SINGULAR]: 'des',
        [Celda.TERCERA_SINGULAR]: 'dé',
      });
    });

    it('oír: el indicativo se extiende al imperativo', () => {
      const tabla = conjuego('oír');

      expect(tabla[Modo.INDICATIVO][Tiempo.PRESENTE]).toMatchObject({
        [Celda.PRIMERA_SINGULAR]: 'oigo',
        [Celda.SEGUNDA_SINGULAR]: 'oyes',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'oís',
      });
      expect(tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA]).toMatchObject({
        [Celda.SEGUNDA_SINGULAR]: 'oye',
        [Celda.SEGUNDA_SINGULAR_VOSEO]: 'oí',
        [Celda.TERCERA_SINGULAR]: 'oiga',
      });
    });

    it.each([
      ['roer', ['roo', 'roigo', 'royo'], ['roa', 'roiga', 'roya']],
      [
        'corroer',
        ['corroo', 'corroigo', 'corroyo'],
        ['corroa', 'corroiga', 'corroya'],
      ],
      [
        'roerse',
        ['me roo', 'me roigo', 'me royo'],
        ['me roa', 'me roiga', 'me roya'],
      ],
    ])('%s: variantes de la raíz', (verbo, presente, subjuntivo) => {
      const tabla = conjuego(verbo);

      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toEqual(presente);
      expect(
        tabla[Modo.SUBJUNTIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toEqual(subjuntivo);
    });

    it('celda vacía', () => {
      expect(
        conjuego('solerse')[Modo.INDICATIVO][Tiempo.FUTURO][
          Celda.PRIMERA_SINGULAR
        ],
      ).toBeNull();
    });
  });

  describe('diccionario por defecto', () => {
    const diccionario = new Map<string, EntradaVerbo>(
      Object.entries(
        JSON.parse(
          readFileSync(
            join(__dirname, '..', 'dict', 'por_defecto.json'),
            'utf8',
          ),
        ),
      ),
    );
    const verbos = [...diccionario].flatMap(([verbo, entrada]) => [
      ...(entrada.abstracto ? [] : [verbo]),
      ...(entrada.hijos ?? []),
    ]);

    it('conjuga todos los verbos', () => {
      configurar(diccionario);

      for (const verbo of verbos) {
        expect(() => conjuego(verbo), verbo).not.toThrow();
      }
    });

    it.each([
      ['condecir', 'con'],
      ['contradecir', 'contra'],
      ['desdecir', 'des'],
      ['predecir', 'pre'],
    ])('%s: futuro doble e imperativo regular', (verbo, prefijo) => {
      configurar(diccionario);
      const tabla = conjuego(verbo);

      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
      ).toBe(`${prefijo}digo`);
      expect(
        tabla[Modo.INDICATIVO][Tiempo.PRETERITO][Celda.TERCERA_PLURAL],
      ).toBe(`${prefijo}dijeron`);
      expect(
        tabla[Modo.INDICATIVO][Tiempo.FUTURO][Celda.PRIMERA_SINGULAR],
      ).toEqual([`${prefijo}deciré`, `${prefijo}diré`]);
      expect(
        tabla[Modo.INDICATIVO][Tiempo.CONDICIONAL][Celda.PRIMERA_PLURAL],
      ).toEqual([`${prefijo}deciríamos`, `${prefijo}diríamos`]);
      expect(
        tabla[Modo.IMPERATIVO][Polaridad.AFIRMATIVA][Celda.SEGUNDA_SINGULAR],
      ).toBe(`${prefijo}dice`);
      expect(tabla[FORMA_NO_PERSONAL][FormaNoPersonal.PARTICIPIO_PASADO]).toBe(
        `${prefijo}dicho`,
      );
    });
  });
});

describe('aplicarFormas', () => {
  configurar(new Map());
  const tabla = conjuego('hacer');

  it('reemplaza solo las celdas indicadas', () => {
    const resultado = aplicarFormas(tabla, {
      [Modo.INDICATIVO]: {
        [Tiempo.PRETERITO]: { [Celda.TERCERA_SINGULAR]: 'hizo' },
      },
      [FORMA_NO_PERSONAL]: { [FormaNoPersonal.PARTICIPIO_PASADO]: null },
    });

    expect(resultado[Modo.INDICATIVO][Tiempo.PRETERITO]).toEqual({
      ...tabla[Modo.INDICATIVO][Tiempo.PRETERITO],
      [Celda.TERCERA_SINGULAR]: 'hizo',
    });
    expect(
      resultado[FORMA_NO_PERSONAL][FormaNoPersonal.PARTICIPIO_PASADO],
    ).toBeNull();
    expect(resultado[Modo.SUBJUNTIVO]).toEqual(tabla[Modo.SUBJUNTIVO]);
  });

  it('acepta variantes', () => {
    const resultado = aplicarFormas(tabla, {
      [Modo.INDICATIVO]: {
        [Tiempo.PRESENTE]: { [Celda.PRIMERA_SINGULAR]: ['hago', 'fago'] },
      },
    });

    expect(
      resultado[Modo.INDICATIVO][Tiempo.PRESENTE][Celda.PRIMERA_SINGULAR],
    ).toEqual(['hago', 'fago']);
  });

  it('no modifica la tabla original', () => {
    const original = structuredClone(tabla);

    aplicarFormas(tabla, {
      [Modo.INDICATIVO]: {
        [Tiempo.PRETERITO]: { [Celda.TERCERA_SINGULAR]: 'hizo' },
      },
    });

    expect(tabla).toEqual(original);
  });
});
