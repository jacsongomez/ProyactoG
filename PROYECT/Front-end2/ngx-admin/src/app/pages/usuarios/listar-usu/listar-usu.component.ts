import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuarios } from '../../../modelos/usuarios.model';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-usu',
  templateUrl: './listar-usu.component.html',
  styleUrls: ['./listar-usu.component.scss']
})
export class ListarUsuComponent implements OnInit{
  usuario : Usuarios[];
  nombresColumnas: string[] = ['Seudonimo','Correo','Contraseña','Rol','Opciones'];
  constructor (private miServicioUsuario: UsuariosService, private router:Router){}
  
  ngOnInit(): void {
    this.listar();    
  }
  listar():void{
    this.miServicioUsuario.listar().
      subscribe(data => {
        this.usuario=data;
    });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/usuarios/crearUsu"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/usuarios/actualizarUsu/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Usuario',
      text: "Está seguro que quiere eliminar el Usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioUsuario.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
