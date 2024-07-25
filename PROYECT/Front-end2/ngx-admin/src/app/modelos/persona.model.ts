export class Persona {
    _id?:string;
    identificacion?:string;
    nombre?:string;
    grupo?:string;
    tipo?:string;
    programa?: {
        _id?:string;
        codigo?:string;
        nombre?:string;
        facultad?:string;
    };
}