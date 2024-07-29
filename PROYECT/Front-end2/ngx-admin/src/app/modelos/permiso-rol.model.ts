export class PermisoRol {
    _id?:string;
    rol?: {
        _id?:string;
        nombre?:string;
        descripcion?:string;
    };
    permiso?: {
        _id?:string;
        url?:string;
        metodo?:string;
        descripcion?:string;
    };
}
