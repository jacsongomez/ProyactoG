import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuarios } from '../modelos/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${environment.url_gateway}/usuarios`);
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(`${environment.url_gateway}/usuarios/${id}`);
  }

  getUsuario(id: string): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${environment.url_gateway}/usuarios/${id}`);
  }
  
  crear(elUsuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(`${environment.url_gateway}/usuarios`, elUsuario);
  }

  editar(id: string, elUsuario: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${environment.url_gateway}/usuarios/${id}`, elUsuario);
  }

  asigRol(id: string, idRol: string, elUsuario: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${environment.url_gateway}/usuarios/${id}/rol/${idRol}`, elUsuario);
  }

  validarCorreo(correo: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(correo);
  }
}
