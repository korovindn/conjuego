import { Forma } from "../types";

export const principal = (forma: Forma) => {
  if (typeof forma === 'string') {
    return forma;
  }
  return forma[0];
};
