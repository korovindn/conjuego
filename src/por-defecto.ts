import diccionario from '../dict/por_defecto.json';
import { configurar } from './conjuego';

configurar(new Map(Object.entries(diccionario)));

export * from './index';
