import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Capacidad } from '../modelos/capacidad.model';

@Injectable({
  providedIn: 'root'
})
export class CapacidadesService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Capacidad[]> {
    return this.http.get<Capacidad[]>(`${environment.url_gateway}/capacidades`);
  }
  eliminar(id:string){
    return this.http.delete<Capacidad>(`${environment.url_gateway}/capacidades/${id}`,);
  }
  getCapacidad(id: string): Observable<Capacidad> {
    return this.http.get<Capacidad>(`${environment.url_gateway}/capacidades/${id}`);
  }
  crear(laCapacidad: Capacidad) {
    return this.http.post(`${environment.url_gateway}/capacidades`, laCapacidad);
  }
  editar(id:string,laCapacidad: Capacidad) {
    return this.http.put(`${environment.url_gateway}/capacidades/${id}`, laCapacidad);
  }
}
