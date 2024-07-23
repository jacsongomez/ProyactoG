import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PermisoRol } from '../../../modelos/permiso-rol.model';
import { PermiRolService } from '../../../servicios/permi-rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-permi-rol',
  templateUrl: './listar-permi-rol.component.html',
  styleUrls: ['./listar-permi-rol.component.scss']
})
export class ListarPermiRolComponent implements OnInit{
  permisoRol : PermisoRol[];
  nombresColumnas: string[] = ['Rol','Permiso','Opciones'];
  constructor (private miServicioPermiRol: PermiRolService, private router:Router){}
  
  ngOnInit(): void {
    this.listar();    
  }
  listar():void{
    this.miServicioPermiRol.listar().
      subscribe(data => {
        this.permisoRol=data;
    });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/permiRol/crearPermiRol"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/permiRol/actualizarPermiRol/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Permiso-Rol',
      text: "Está seguro que quiere eliminar el Permiso-Rol?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioPermiRol.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El permiso-rol ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
