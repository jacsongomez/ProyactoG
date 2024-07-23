import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PermisoRol } from '../modelos/permiso-rol.model';

@Injectable({
  providedIn: 'root'
})
export class PermiRolService {

  constructor(private http: HttpClient) { }

  listar(): Observable<PermisoRol[]> {
    return this.http.get<PermisoRol[]>(`${environment.url_gateway}/permisos-roles`);
  }
  eliminar(id:string){
    return this.http.delete<PermisoRol>(`${environment.url_gateway}/permisos-roles/${id}`);
  }
  getPermisoRol(id: string): Observable<PermisoRol> {
    return this.http.get<PermisoRol>(`${environment.url_gateway}/permisos-roles/${id}`);
  }
  crear(idRol:string, idPermiso:string,elPermisoRol: PermisoRol) {
    return this.http.post(`${environment.url_gateway}/permisos-roles/rol/${idRol}/permiso/${idPermiso}`, elPermisoRol);
  }
  editar(id:string,idRol:string, idPermiso:string, laAsigCap: PermisoRol) {
    return this.http.put(`${environment.url_gateway}/permisos-roles/${id}/rol/${idRol}/permiso/${idPermiso}`, laAsigCap);
  }
}
