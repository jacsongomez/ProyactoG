import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PermisoRol } from '../../../modelos/permiso-rol.model';
import { PermiRolService } from '../../../servicios/permi-rol.service';
import { Roles } from '../../../modelos/roles.model';
import { RolesService } from '../../../servicios/roles.service';
import { Permiso } from '../../../modelos/permiso.model';
import { PermisosService } from '../../../servicios/permisos.service';

@Component({
  selector: 'ngx-crear-permi-rol',
  templateUrl: './crear-permi-rol.component.html',
  styleUrls: ['./crear-permi-rol.component.scss']
})
export class CrearPermiRolComponent implements OnInit {
  modoCreacion: boolean = true;
  id_permiRol: string = "";
  intentoEnvio: boolean = false;
  elPermisoRol: PermisoRol = {
    permiso: {
      _id:"",
      metodo:"",
      url:"",
      descripcion:"",
    },
    rol: {
      _id:"",
      descripcion:"",
      nombre:"",
    },
  }
  elrol: Roles[]=[];
  elpermiso: Permiso[]=[];

  constructor(private miServicioPermisoRol: PermiRolService,
    private miServicioRol: RolesService, 
    private miServicioPermisos: PermisosService,
    private rutaActiva: ActivatedRoute, 
    private router: Router) { }
  
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_permiRol) {
      this.modoCreacion = false;
      this.id_permiRol = this.rutaActiva.snapshot.params.id_permiRol;
      this.getPermisoRol(this.id_permiRol)
    } else {
      this.modoCreacion = true;
    }
    this.getRol();
    this.getPermiso();
  }

  getPermisoRol(id: string) {
    this.miServicioPermisoRol.getPermisoRol(id).subscribe(data => {
      this.elPermisoRol = data;
    });
  }

  getRol(){
    this.miServicioRol.listar().subscribe((data: Roles[]) => {
      this.elrol = data;
    })
  }
  getPermiso() {
    this.miServicioPermisos.listar().subscribe((data: Permiso[]) => {
      this.elpermiso = data;
    });
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioPermisoRol.crear(this.elPermisoRol.rol._id,this.elPermisoRol.permiso._id,this.elPermisoRol).subscribe(data => {
        Swal.fire(
          'Creado',
          'El Permiso - Rol ha sido creado correctamente',
          'success'
        )
        this.router.navigate(["pages/permiRol/listarPermiRol"]);
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioPermisoRol.editar(this.elPermisoRol._id,this.elPermisoRol.rol._id,this.elPermisoRol.permiso._id,
      this.elPermisoRol).subscribe(data => {
        Swal.fire(
          'Actualizado',
          'El Permiso - Rol ha sido actualizado correctamente',
          'success'
        )
        this.router.navigate(["pages/permiRol/listarPermiRol"]);
      });
    }
  }

  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elPermisoRol.rol._id=="" ||
      this.elPermisoRol.permiso._id==""){
        return false;
    }else{
      return true;
    }
  }

  cancelar() {
    // Navegar a la ruta deseada cuando se hace clic en Cancelar
    this.router.navigate(['pages/permiRol/listarPermiRol']);
  }
}
