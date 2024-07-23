import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Programa } from '../modelos/programa.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Programa[]> {
    return this.http.get<Programa[]>(`${environment.url_gateway}/programas`);
  }
  eliminar(id:string){
    return this.http.delete<Programa>(`${environment.url_gateway}/programas/${id}`,);
  }
  getPrograma(id: string): Observable<Programa> {
    return this.http.get<Programa>(`${environment.url_gateway}/programas/${id}`);
  }
  crear(elPrograma: Programa) {
    return this.http.post(`${environment.url_gateway}/programas`, elPrograma);
  }
  editar(id:string,elPrograma: Programa) {
    return this.http.put(`${environment.url_gateway}/programas/${id}`, elPrograma);
  }
}
