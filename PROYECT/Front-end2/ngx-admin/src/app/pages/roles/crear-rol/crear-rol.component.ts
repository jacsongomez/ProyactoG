import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Roles } from '../../../modelos/roles.model';
import { RolesService } from '../../../servicios/roles.service';

@Component({
  selector: 'ngx-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.scss']
})
export class CrearRolComponent implements OnInit {
  modoCreacion: boolean = true;
  id_rol: string = "";
  intentoEnvio: boolean = false;
  elRol: Roles = {
    nombre: "",
    descripcion: ""
  }

  constructor(private miServicioRol: RolesService, 
    private rutaActiva: ActivatedRoute, 
    private router: Router) { }
  
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_rol) {
      this.modoCreacion = false;
      this.id_rol = this.rutaActiva.snapshot.params.id_rol;
      this.getRol(this.id_rol)
    } else {
      this.modoCreacion = true;
    }
  }

  getRol(id: string) {
    this.miServicioRol.getRol(id).subscribe(data => {
      this.elRol = data;
    });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioRol.crear(this.elRol).subscribe(data => {
        Swal.fire(
          'Creado',
          'El rol ha sido creado correctamente',
          'success'
        )
        this.router.navigate(["pages/roles/listarRol"]);
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioRol.editar(this.elRol._id,this.elRol).subscribe(data => {
        Swal.fire(
          'Actualizado',
          'El rol ha sido actualizado correctamente',
          'success'
        )
        this.router.navigate(["pages/roles/listarRol"]);
      });
    }
  }

  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elRol.nombre=="" ||
      this.elRol.descripcion==""){
        return false;
    }else{
      return true;
    }
  }
  cancelar() {
    // Navegar a la ruta deseada cuando se hace clic en Cancelar
    this.router.navigate(['pages/roles/listarRol']);
  }
}
