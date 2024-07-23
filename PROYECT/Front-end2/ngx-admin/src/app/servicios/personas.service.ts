import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Persona } from '../modelos/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${environment.url_gateway}/personas`);
  }
  eliminar(id:string){
    return this.http.delete<Persona>(`${environment.url_gateway}/personas/${id}`,);
  }
  getPersona(id: string): Observable<Persona> {
    return this.http.get<Persona>(`${environment.url_gateway}/personas/${id}`);
  }
  crear(laPersona: Persona) {
    return this.http.post(`${environment.url_gateway}/personas`, laPersona);
  }
  editar(id:string,laPersona: Persona) {
    return this.http.put(`${environment.url_gateway}/personas/${id}`, laPersona);
  }
  asigProgram(id:string,idPrograma:string, laPersona: Persona) {
    return this.http.put(`${environment.url_gateway}/personas/${id}/programas/${idPrograma}`, laPersona);
  }
}
