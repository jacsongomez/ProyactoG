import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Roles } from '../modelos/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${environment.url_gateway}/roles`);
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(`${environment.url_gateway}/roles/${id}`);
  }

  getRol(id: string): Observable<Roles> {
    return this.http.get<Roles>(`${environment.url_gateway}/roles/${id}`);
  }

  crear(elRol: Roles): Observable<Roles> {
    return this.http.post<Roles>(`${environment.url_gateway}/roles`, elRol);
  }

  editar(id: string, elRol: Roles): Observable<Roles> {
    return this.http.put<Roles>(`${environment.url_gateway}/roles/${id}`, elRol);
  }
}
