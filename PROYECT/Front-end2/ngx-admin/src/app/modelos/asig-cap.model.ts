import { Persona } from './persona.model'; // Ajusta la ruta según tu estructura

export class AsigCap {
  _id?: string;
  persona?: {
    _id?:string;
    identificacion?:string;
    nombre?:string;
    grupo?:string;
    tipo?:string;
    programa?: string;
  }; // Puede ser undefined si no está garantizado
  capacidad?: {
    _id?:string;
    nombre?:string;
    tipo?:string;
  }; // Ajusta el tipo según el modelo
  Nivel_Capacidad?: string;
  Fecha_Diagnostico?: string;
  Descripcion?: string;
}
