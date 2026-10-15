import { Numero, Persona, Pronombre, Tratamiento } from '../types';

const PRIMERA_SINGULAR: Tratamiento = {
  persona: Persona.PRIMERA,
  numero: Numero.SINGULAR,
};

const SEGUNDA_SINGULAR_TU: Tratamiento = {
  persona: Persona.SEGUNDA,
  numero: Numero.SINGULAR,
  variant: Pronombre.TU,
};

const SEGUNDA_SINGULAR_VOS: Tratamiento = {
  persona: Persona.SEGUNDA,
  numero: Numero.SINGULAR,
  variant: Pronombre.VOS,
};

const SEGUNDA_SINGULAR_USTED: Tratamiento = {
  persona: Persona.SEGUNDA,
  numero: Numero.SINGULAR,
  variant: Pronombre.USTED,
};

const TERCERA_SINGULAR: Tratamiento = {
  persona: Persona.TERCERA,
  numero: Numero.SINGULAR,
};

const PRIMERA_PLURAL: Tratamiento = {
  persona: Persona.PRIMERA,
  numero: Numero.PLURAL,
};

const SEGUNDA_PLURAL_VOSOTROS: Tratamiento = {
  persona: Persona.SEGUNDA,
  numero: Numero.PLURAL,
  variant: Pronombre.VOSOTROS,
};

const SEGUNDA_PLURAL_USTEDES: Tratamiento = {
  persona: Persona.SEGUNDA,
  numero: Numero.PLURAL,
  variant: Pronombre.USTEDES,
};

const TERCERA_PLURAL: Tratamiento = {
  persona: Persona.TERCERA,
  numero: Numero.PLURAL,
};

export const TRATAMIENTO: Record<Pronombre, Tratamiento> = {
  [Pronombre.YO]: PRIMERA_SINGULAR,
  [Pronombre.TU]: SEGUNDA_SINGULAR_TU,
  [Pronombre.VOS]: SEGUNDA_SINGULAR_VOS,
  [Pronombre.USTED]: SEGUNDA_SINGULAR_USTED,
  [Pronombre.EL]: TERCERA_SINGULAR,
  [Pronombre.ELLA]: TERCERA_SINGULAR,
  [Pronombre.NOSOTROS]: PRIMERA_PLURAL,
  [Pronombre.NOSOTRAS]: PRIMERA_PLURAL,
  [Pronombre.VOSOTROS]: SEGUNDA_PLURAL_VOSOTROS,
  [Pronombre.VOSOTRAS]: SEGUNDA_PLURAL_VOSOTROS,
  [Pronombre.USTEDES]: SEGUNDA_PLURAL_USTEDES,
  [Pronombre.ELLOS]: TERCERA_PLURAL,
  [Pronombre.ELLAS]: TERCERA_PLURAL,
};
