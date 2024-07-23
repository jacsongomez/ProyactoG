import { Persona } from './persona.model'; // Ajusta la ruta según tu estructura

export class AsigCap {
  _id?: string;
  persona?: Persona; // Puede ser undefined si no está garantizado
  capacidad?: any; // Ajusta el tipo según el modelo
  Nivel_Capacidad?: string;
  Fecha_Diagnostico?: string;
  Descripcion?: string;
}
