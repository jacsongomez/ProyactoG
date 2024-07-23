import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Capacidad } from '../../../modelos/capacidad.model';
import { CapacidadesService } from '../../../servicios/capacidades.service';

@Component({
  selector: 'ngx-crear-cap',
  templateUrl: './crear-cap.component.html',
  styleUrls: ['./crear-cap.component.scss']
})
export class CrearCapComponent implements OnInit {
  modoCreacion: boolean = true;
  id_capacidad: string = "";
  intentoEnvio: boolean = false;
  laCapacidad: Capacidad = {
    nombre: "",
    tipo: ""
  }

  constructor(private miServicioCapacidades: CapacidadesService, 
    private rutaActiva: ActivatedRoute, 
    private router: Router) { }
  
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_capacidad) {
      this.modoCreacion = false;
      this.id_capacidad = this.rutaActiva.snapshot.params.id_capacidad;
      this.getCapacidad(this.id_capacidad)
    } else {
      this.modoCreacion = true;
    }
  }

  getCapacidad(id: string) {
    this.miServicioCapacidades.getCapacidad(id).subscribe(data => {
      this.laCapacidad = data;
    });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioCapacidades.crear(this.laCapacidad).subscribe(data => {
        Swal.fire(
          'Creada',
          'La capacidad ha sido creada correctamente',
          'success'
        )
        this.router.navigate(["pages/capacidades/listarCap"]);
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioCapacidades.editar(this.laCapacidad._id,
      this.laCapacidad).subscribe(data => {
        Swal.fire(
          'Actualizada',
          'La capacidad ha sido actualizada correctamente',
          'success'
        )
        this.router.navigate(["pages/capacidades/listarCap"]);
      });
    }
  }

  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.laCapacidad.nombre=="" ||
      this.laCapacidad.tipo==""){
        return false;
    }else{
      return true;
    }
  }

  cancelar() {
    // Navegar a la ruta deseada cuando se hace clic en Cancelar
    this.router.navigate(['pages/capacidades/listarCap']);
  }
}
