import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Consejo } from '../modelos/consejo.model';

@Injectable({
  providedIn: 'root'
})
export class ConsejosService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Consejo[]> {
    return this.http.get<Consejo[]>(`${environment.url_gateway}/consejos`);
  }
  eliminar(id:string){
    return this.http.delete<Consejo>(`${environment.url_gateway}/consejos/${id}`,);
  }
  getConsejo(id: string): Observable<Consejo> {
    return this.http.get<Consejo>(`${environment.url_gateway}/consejos/${id}`);
  }
  getConsejoPorCapacidad(idCapacidad: string): Observable<Consejo> {
    return this.http.get<Consejo>(`${environment.url_gateway}/consejos/capacidad/${idCapacidad}`);
  }
  crear(idCapacidad:string, elConsejo: Consejo) {
    return this.http.post(`${environment.url_gateway}/consejos/capacidad/${idCapacidad}`, elConsejo);
  }
  editar(id:string, idCapacidad:string, elConsejo: Consejo) {
    return this.http.put(`${environment.url_gateway}/consejos/${id}/capacidad/${idCapacidad}`, elConsejo);
  }
}
