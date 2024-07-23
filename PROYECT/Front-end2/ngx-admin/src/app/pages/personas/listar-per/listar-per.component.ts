import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Persona } from '../../../modelos/persona.model';
import { PersonasService } from '../../../servicios/personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-per',
  templateUrl: './listar-per.component.html',
  styleUrls: ['./listar-per.component.scss']
})
export class ListarPerComponent implements OnInit{
  personas : Persona[];
  nombresColumnas: string[] = ['Identificaion','Nombre','programa','grupo','tipo','Opciones'];
  constructor(private miServicioPersonas: PersonasService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.miServicioPersonas.listar().subscribe(data => {
      this.personas=data;
    });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/personas/crearPer"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/personas/actualizarPer/"+id]);
  }
  asigPrograma(id:string):void{
    console.log("asignando programa a "+id)
    this.router.navigate(["pages/personas/asignarPrograma/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Persona',
      text: "Está seguro que quiere eliminar la persona?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioPersonas.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'La persona ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
