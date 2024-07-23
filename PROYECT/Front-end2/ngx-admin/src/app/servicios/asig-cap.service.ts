import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AsigCap } from '../modelos/asig-cap.model';

@Injectable({
  providedIn: 'root'
})
export class AsigCapService {

  constructor(private http: HttpClient) { }

  listar(): Observable<AsigCap[]> {
    return this.http.get<AsigCap[]>(`${environment.url_gateway}/asignaciones`);
  }
  eliminar(id:string){
    return this.http.delete<AsigCap>(`${environment.url_gateway}/asignaciones/${id}`);
  }
  getAsigCap(id: string): Observable<AsigCap> {
    return this.http.get<AsigCap>(`${environment.url_gateway}/asignaciones/${id}`);
  }
  crear(idCapacidad:string, idPersona:string, laAsigCap: AsigCap) {
    return this.http.post(`${environment.url_gateway}/asignaciones/capacidad/${idCapacidad}/persona/${idPersona}`, laAsigCap);
  }
  editar(id:string, idCapacidad:string, idPersona:string, laAsigCap: AsigCap) {
    return this.http.put(`${environment.url_gateway}/asignaciones/${id}/capacidad/${idCapacidad}/persona/${idPersona}`, laAsigCap);
  }
}
