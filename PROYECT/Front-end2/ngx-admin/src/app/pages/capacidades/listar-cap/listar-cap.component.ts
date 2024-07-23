import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Capacidad } from '../../../modelos/capacidad.model';
import { CapacidadesService } from '../../../servicios/capacidades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-cap',
  templateUrl: './listar-cap.component.html',
  styleUrls: ['./listar-cap.component.scss']
})
export class ListarCapComponent implements OnInit {
  capacidades : Capacidad[];
  nombresColumnas: string[] = ['Nombre','Tipo','Opciones'];
  constructor(private miServicioCapacidades: CapacidadesService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.miServicioCapacidades.listar().subscribe(data => {
      this.capacidades=data;
    });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/capacidades/crearCap"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/capacidades/actualizarCap/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Capacidad',
      text: "Está seguro que quiere eliminar la capacidad?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioCapacidades.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'La capacidad ha sido eliminada correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}
