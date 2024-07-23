import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Consejo } from '../../../modelos/consejo.model';
import { ConsejosService } from '../../../servicios/consejos.service';
import { Capacidad } from '../../../modelos/capacidad.model';
import { CapacidadesService } from '../../../servicios/capacidades.service';

@Component({
  selector: 'ngx-crear-cons',
  templateUrl: './crear-cons.component.html',
  styleUrls: ['./crear-cons.component.scss']
})
export class CrearConsComponent implements OnInit {
  modoCreacion: boolean = true;
  id_consejo: string = "";
  intentoEnvio: boolean = false;
  elConsejo: Consejo = {
    consejo: "",
    momento: "",
    capacidad: "",
    Nivel_Capacidad: "",
  }
  lacapacidad: Capacidad[]=[];

  constructor(private miServicioConsejoS: ConsejosService, 
    private miServicioCapacidades: CapacidadesService,
    private rutaActiva: ActivatedRoute, 
    private router: Router) { }
  
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_consejo) {
      this.modoCreacion = false;
      this.id_consejo = this.rutaActiva.snapshot.params.id_consejo;
      this.getConsejo(this.id_consejo)
    } else {
      this.modoCreacion = true;
    }
    this.getCapacidad();
  }

  getConsejo(id: string) {
    this.miServicioConsejoS.getConsejo(id).subscribe(data => {
      this.elConsejo = data;
    });
  }

  getCapacidad() {
    this.miServicioCapacidades.listar().subscribe((data: Capacidad[]) => {
      this.lacapacidad= data;
    });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioConsejoS.crear(this.elConsejo.capacidad,this.elConsejo).subscribe(data => {
        Swal.fire(
          'Creado',
          'El Consejo ha sido creado correctamente',
          'success'
        )
        this.router.navigate(["/pages/consejos/listarCons"]);
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioConsejoS.editar(this.elConsejo._id,this.elConsejo.capacidad,this.elConsejo).subscribe(data => {
        Swal.fire(
          'Actualizado',
          'El consejo ha sido actualizado correctamente',
          'success'
        )
        this.router.navigate(["/pages/consejos/listarCons"]);
      });
    }
  }

  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elConsejo.consejo=="" ||
      this.elConsejo.momento=="" ||
      this.elConsejo.capacidad=="" ||
      this.elConsejo.Nivel_Capacidad==""){
        return false;
    }else{
      return true;
    }
  }
  cancelar() {
    // Navegar a la ruta deseada cuando se hace clic en Cancelar
    this.router.navigate(['/pages/consejos/listarCons']);
  }
}