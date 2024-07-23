import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Permiso } from '../../../modelos/permiso.model';
import { PermisosService } from '../../../servicios/permisos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-permiso',
  templateUrl: './listar-permiso.component.html',
  styleUrls: ['./listar-permiso.component.scss']
})
export class ListarPermisoComponent implements OnInit {
  permisos : Permiso[];
  nombresColumnas: string[] = ['Url','Metodo','Opciones'];
  constructor (private miServicioPermisos: PermisosService, private router:Router){}
  
  ngOnInit(): void {
    this.listar();    
  }
  listar():void{
    this.miServicioPermisos.listar().
      subscribe(data => {
        this.permisos=data;
    });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/permisos/crearPermiso"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/permisos/actualizarPermiso/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Permiso',
      text: "Está seguro que quiere eliminar el Permiso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioPermisos.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El permiso ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
