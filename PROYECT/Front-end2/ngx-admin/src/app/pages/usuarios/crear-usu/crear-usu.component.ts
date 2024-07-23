import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuarios } from '../../../modelos/usuarios.model';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Roles } from '../../../modelos/roles.model';
import { RolesService } from '../../../servicios/roles.service';

@Component({
  selector: 'ngx-crear-usu',
  templateUrl: './crear-usu.component.html',
  styleUrls: ['./crear-usu.component.scss']
})
export class CrearUsuComponent implements OnInit {
  modoCreacion: boolean = true;
  id_usuario: string = "";
  intentoEnvio: boolean = false;
  elUsuario: Usuarios = {
    seudonimo: "",
    correo: "",
    contrasena: "",
    rol_id: "",
  }
  elrol: Roles[]=[];

  constructor(private miServicioUsuarios: UsuariosService, 
    private miServisioRol: RolesService,
    private rutaActiva: ActivatedRoute, 
    private router: Router) { }
  
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_usuario) {
      this.modoCreacion = false;
      this.id_usuario = this.rutaActiva.snapshot.params.id_usuario;
      this.getUsuario(this.id_usuario)
    } else {
      this.modoCreacion = true;
    }
    this.getRol();
  }

  getUsuario(id: string) {
    this.miServicioUsuarios.getUsuario(id).subscribe(data => {
      this.elUsuario = data;
    });
  }

  getRol(){
    this.miServisioRol.listar().subscribe((data: Roles[]) => {
      this.elrol = data;
    })
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      console.log(this.elUsuario)
      this.miServicioUsuarios.crear(this.elUsuario).subscribe(data => {
        Swal.fire(
          'Creado',
          'El usuario ha sido creado correctamente',
          'success'
        )
        this.router.navigate(["pages/usuarios/listarUsu"]);
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      
      this.miServicioUsuarios.editar(this.elUsuario._id,this.elUsuario).subscribe(data => {
        this.miServicioUsuarios.asigRol(this.elUsuario._id,this.elUsuario.rol_id,this.elUsuario).subscribe(data => {});
        Swal.fire(
          'Actualizado',
          'El usuario ha sido actualizado correctamente',
          'success'
        )
        this.router.navigate(["pages/usuarios/listarUsu"]);
      });
    }
  }

  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.elUsuario.seudonimo=="" ||
      this.elUsuario.correo=="" ||
      this.elUsuario.contrasena==""){
        return false;
    }else{
      return true;
    }
  }

  cancelar() {
    // Navegar a la ruta deseada cuando se hace clic en Cancelar
    this.router.navigate(['pages/usuarios/listarUsu']);
  }
}
