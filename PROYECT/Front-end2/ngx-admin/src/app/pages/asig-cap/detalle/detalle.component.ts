import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsigCapService } from '../../../servicios/asig-cap.service';
import { PersonasService } from '../../../servicios/personas.service';
import { CapacidadesService } from '../../../servicios/capacidades.service';
import { ConsejosService } from '../../../servicios/consejos.service';
import { AsigCap } from '../../../modelos/asig-cap.model';
import { Persona } from '../../../modelos/persona.model';
import { Capacidad } from '../../../modelos/capacidad.model';
import { Consejo } from '../../../modelos/consejo.model';

@Component({
  selector: 'ngx-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  id_asignacion: string = "";
  laAsignacion: AsigCap | null = null;
  persona: Persona | null = null;
  capacidad: Capacidad | null = null;
  consejos: Consejo | null = null;

  constructor(
    private miServicioAsignacion: AsigCapService, 
    private miServicioPersonas: PersonasService,
    private miServicioCapacidades: CapacidadesService,
    private miServicioConsejos: ConsejosService,
    private rutaActiva: ActivatedRoute, 
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.id_asignacion = this.rutaActiva.snapshot.params.id_asignacion;
    if (this.id_asignacion) {
      this.getAsigCap(this.id_asignacion);
    }
  }

  getAsigCap(id: string) {
    this.miServicioAsignacion.getAsigCap(id).subscribe(data => {
      this.laAsignacion = data;
      this.loadAdditionalData();
    });
  }

  loadAdditionalData(): void {
    if (this.laAsignacion) {
      // Obtener la persona
      if (this.laAsignacion.persona) {
        this.miServicioPersonas.getPersona(this.laAsignacion.persona._id).subscribe(data => {
          this.persona = data;
        });
      }
      
      // Obtener la capacidad
      if (this.laAsignacion.capacidad) {
        this.miServicioCapacidades.getCapacidad(this.laAsignacion.capacidad._id).subscribe(data => {
          this.capacidad = data;
          this.getConsejos(this.laAsignacion.capacidad._id);
        });
      }
    }
  }

  getConsejos(id_capacidad: string) {
    this.miServicioConsejos.getConsejoPorCapacidad(id_capacidad).subscribe(data => {
      this.consejos = data;
    });
  }

  volver() {
    this.router.navigate(['pages/asigCap/listarAsig']);
  }
}
