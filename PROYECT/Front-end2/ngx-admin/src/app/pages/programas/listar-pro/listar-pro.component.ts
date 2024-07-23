import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Programa } from '../../../modelos/programa.model';
import { ProgramasService } from '../../../servicios/programas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-pro',
  templateUrl: './listar-pro.component.html',
  styleUrls: ['./listar-pro.component.scss']
})
export class ListarProComponent implements OnInit{
  programas : Programa[];
  nombresColumnas: string[] = ['Codigo','Nombre','Facultad','Opciones'];
  constructor(private miServicioProgramas: ProgramasService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.miServicioProgramas.listar().subscribe(data => {
      this.programas=data;
    });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/programas/crearPro"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/programas/actualizarPro/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Programa',
      text: "Está seguro que quiere eliminar el programa?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioProgramas.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El programa ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
