export enum Persona {
  PRIMERA = 'primera',
  SEGUNDA = 'segunda',
  TERCERA = 'tercera',
}

export enum Numero {
  SINGULAR = 'singular',
  PLURAL = 'plural',
}

export enum Pronombre {
  // Primera singular
  YO = 'yo',
  // Primera plural
  NOSOTROS = 'nosotros',
  NOSOTRAS = 'nosotras',
  // Segunda singular
  TU = 'tú',
  VOS = 'vos',
  USTED = 'usted',
  // Segunda plural
  USTEDES = 'ustedes',
  VOSOTROS = 'vosotros',
  VOSOTRAS = 'vosotras',
  // Tercera singular
  EL = 'él',
  ELLA = 'ella',
  // Tercera plural
  ELLOS = 'ellos',
  ELLAS = 'ellas',
}

export type SegundaSingularVariant =
  | Pronombre.TU
  | Pronombre.VOS
  | Pronombre.USTED;

export type SegundaPluralVariant = Pronombre.VOSOTROS | Pronombre.USTEDES;

export type Tratamiento =
  | { persona: Persona.PRIMERA | Persona.TERCERA; numero: Numero }
  | {
      persona: Persona.SEGUNDA;
      numero: Numero.SINGULAR;
      variant: SegundaSingularVariant;
    }
  | {
      persona: Persona.SEGUNDA;
      numero: Numero.PLURAL;
      variant: SegundaPluralVariant;
    };

export enum Genero {
  MASCULINO = 'masculino',
  FEMENINO = 'femenino',
}

export enum Modo {
  INDICATIVO = 'indicativo',
  SUBJUNTIVO = 'subjuntivo',
  IMPERATIVO = 'imperativo',
}

export const FORMA_NO_PERSONAL = 'no_personal';

export enum Tiempo {
  PRESENTE = 'presente',
  PRETERITO = 'preterito',
  IMPERFECTO = 'imperfecto',
  FUTURO = 'futuro',
  CONDICIONAL = 'condicional',
}

export enum TiempoCompuesto {
  /** haber en presente */
  PERFECTO = 'perfecto',
  /** haber en imperfecto */
  PLUSCUAMPERFECTO = 'pluscuamperfecto',
  /** haber en pretérito */
  ANTERIOR = 'anterior',
  /** haber en futuro */
  FUTURO_PERFECTO = 'futuro_perfecto',
  /** haber en condicional */
  CONDICIONAL_PERFECTO = 'condicional_perfecto',
}

export enum FormaNoPersonal {
  INFINITIVO = 'infinitivo',
  GERUNDIO = 'gerundio',
  PARTICIPIO_PASADO = 'participio_pasado',
}

export enum FormaNoPersonalCompuesta {
  INFINITIVO_COMPUESTO = 'infinitivo_compuesto',
  GERUNDIO_COMPUESTO = 'gerundio_compuesto',
}

export enum Polaridad {
  AFIRMATIVA = 'afirmativa',
  NEGATIVA = 'negativa',
}

export enum Clase {
  AR = 'ar',
  ER = 'er',
  IR = 'ir',
}

export enum Alternancia {
  E_IE = 'e>ie',
  E_IE_I = 'e>ie/i',
  E_I = 'e>i',
  O_UE = 'o>ue',
  O_UE_U = 'o>ue/u',
  U_UE = 'u>ue',
  I_IE = 'i>ie',
  O_HUE = 'o>hue',
  E_YE = 'e>ye',
}
