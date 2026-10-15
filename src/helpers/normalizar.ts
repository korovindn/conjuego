export const normalizar = (palabra: string) => {
  return palabra.trim().toLowerCase().normalize('NFC');
};
