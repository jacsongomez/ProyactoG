import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Programa } from '../../../modelos/programa.model';
import { ProgramasService } from '../../../servicios/programas.service';

@Component({
  selector: 'ngx-crear-pro',
  templateUrl: './crear-pro.component.html',
  styleUrls: ['./crear-pro.component.scss']
})
export class CrearProComponent implements OnInit {
  modoCreacion: boolean = true;
  id_programa: string = "";
  intentoEnvio: boolean = false;
  elPrograma: Programa = {
    codigo: "",
    nombre: "",
    facultad: ""
  }

  constructor(private miServicioProgramas: ProgramasService, 
    private rutaActiva: ActivatedRoute, 
    private router: Router) { }
  
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_programa) {
      this.modoCreacion = false;
      this.id_programa = this.rutaActiva.snapshot.params.id_programa;
      this.getPrograma(this.id_programa)
    } else {
      this.modoCreacion = true;
    }
  }

  getPrograma(id: string) {
    this.miServicioProgramas.getPrograma(id).subscribe(data => {
      this.elPrograma = data;
    });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioProgramas.crear(this.elPrograma).subscribe(data => {
        Swal.fire(
          'Creado',
          'El programa ha sido creado correctamente',
          'success'
        )
        this.router.navigate(["pages/programas/listarPro"]);
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioProgramas.editar(this.elPrograma._id,this.elPrograma).subscribe(data => {
        Swal.fire(
          'Actualizado',
          'El programa ha sido actualizado correctamente',
          'success'
        )
        this.router.navigate(["pages/programas/listarPro"]);
      });
    }
  }

  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elPrograma.codigo=="" ||
      this.elPrograma.nombre=="" ||
      this.elPrograma.facultad==""){
        return false;
    }else{
      return true;
    }
  }

  cancelar() {
    // Navegar a la ruta deseada cuando se hace clic en Cancelar
    this.router.navigate(['pages/programas/listarPro']);
  }
}
