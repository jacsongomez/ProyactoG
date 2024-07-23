import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Roles } from '../../../modelos/roles.model';
import { RolesService } from '../../../servicios/roles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.scss']
})
export class ListarRolComponent implements OnInit{
  rol : Roles[];
  nombresColumnas: string[] = ['Nombre','Descirpción','Opciones'];
  constructor (private miServicioRol: RolesService, private router:Router){}
  
  ngOnInit(): void {
    this.listar();    
  }
  listar():void{
    this.miServicioRol.listar().
      subscribe(data => {
        this.rol=data;
    });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/roles/crearRol"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/roles/actualizarRol/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Rol',
      text: "Está seguro que quiere eliminar el Rol?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioRol.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El rol ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
