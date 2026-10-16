import { beforeEach, describe, expect, it } from 'vitest';
import { configurar, conjuego } from './conjuego';
import {
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
        ]),
      );
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
});
