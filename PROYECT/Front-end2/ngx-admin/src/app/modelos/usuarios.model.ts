export class Usuarios {
    _id?:string;
    seudonimo?:string;
    correo?:string;
    contrasena?:string;
    rol?: {
        _id?:string;
        nombre?:string;
        descripcion?:string;
    };
    token?:string;
}
