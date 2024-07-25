import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AsigCap } from '../../../modelos/asig-cap.model';
import { AsigCapService } from '../../../servicios/asig-cap.service';
import { Persona } from '../../../modelos/persona.model';
import { PersonasService } from '../../../servicios/personas.service';
import { Capacidad } from '../../../modelos/capacidad.model';
import { CapacidadesService } from '../../../servicios/capacidades.service';

@Component({
  selector: 'ngx-crear-asig',
  templateUrl: './crear-asig.component.html',
  styleUrls: ['./crear-asig.component.scss']
})
export class CrearAsigComponent implements OnInit {
  modoCreacion: boolean = true;
  id_asignacion: string = "";
  intentoEnvio: boolean = false;
  laAsignacion: AsigCap = {
    Nivel_Capacidad: "",
    Fecha_Diagnostico: "",
    Descripcion: "",
    capacidad: {
      _id:"",
      nombre:"",
      tipo:"",
    },
    persona: {
      _id:"",
      grupo:"",
      identificacion:"",
      nombre:"",
      programa: "",
      tipo:"",
    },
  }
  lapersona: Persona[] = [];
  lacapacidad: Capacidad[] = [];

  constructor(
    private miServicioAsignaciones: AsigCapService, 
    private miServicioPersonas: PersonasService,
    private miServicioCapacidades: CapacidadesService,
    private rutaActiva: ActivatedRoute, 
    private router: Router
  ) { }
  
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_asignacion) {
      this.modoCreacion = false;
      this.id_asignacion = this.rutaActiva.snapshot.params.id_asignacion;
      this.getAsigCap(this.id_asignacion);
    } else {
      this.modoCreacion = true;
    }
    this.getPersona();
    this.getCapacidad();
  }

  getAsigCap(id: string) {
    this.miServicioAsignaciones.getAsigCap(id).subscribe(data => {
      this.laAsignacion = data;
    });
  }

  getPersona(){
    this.miServicioPersonas.listar().subscribe((data: Persona[]) => {
      this.lapersona = data;
    });
  }

  getCapacidad() {
    this.miServicioCapacidades.listar().subscribe((data: Capacidad[]) => {
      this.lacapacidad = data;
    });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioAsignaciones.crear(this.laAsignacion.capacidad._id, this.laAsignacion.persona._id,this.laAsignacion).subscribe(data => {
        Swal.fire(
          'Creada',
          'La asignación ha sido creada correctamente',
          'success'
        );
        this.router.navigate(["pages/asigCap/listarAsig"]);
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioAsignaciones.editar(this.laAsignacion._id, this.laAsignacion.capacidad._id, this.laAsignacion.persona._id, this.laAsignacion).subscribe(data => {
        Swal.fire(
          'Actualizada',
          'La asignación ha sido actualizada correctamente',
          'success'
        );
        this.router.navigate(["pages/asigCap/listarAsig"]);
      });
    }
  }

  validarDatosCompletos(): boolean {
    this.intentoEnvio = true;
    if(this.laAsignacion.persona._id == "" ||
      this.laAsignacion.capacidad._id == "" ||
      this.laAsignacion.Nivel_Capacidad == "" ||
      this.laAsignacion.Fecha_Diagnostico == "" ||
      this.laAsignacion.Descripcion == ""){
        return false;
    }else{
      return true;
    }
  }

  cancelar() {
    this.router.navigate(['pages/asigCap/listarAsig']);
  }
}
