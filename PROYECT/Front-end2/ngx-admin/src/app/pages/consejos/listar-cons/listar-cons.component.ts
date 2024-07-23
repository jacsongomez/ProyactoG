import { Component , OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Consejo } from '../../../modelos/consejo.model';
import { ConsejosService } from '../../../servicios/consejos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-cons',
  templateUrl: './listar-cons.component.html',
  styleUrls: ['./listar-cons.component.scss']
})
export class ListarConsComponent implements OnInit{
  Consejos : Consejo[];
  nombresColumnas: string[] = ['Consejo','Momento','Capacidad','Grado de Capacidad','Opciones'];
  constructor(private miServicioConsejos: ConsejosService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.miServicioConsejos.listar().subscribe(data => {
      this.Consejos=data;
    });
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["/pages/consejos/crearCons"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["/pages/consejos/actualizarCons/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Consejo',
      text: "Está seguro que quiere eliminar el Consejo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioConsejos.eliminar(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El Consejo ha sido eliminado correctamente',
            'success'
          )
          this.ngOnInit();
        });
      }
    })
  }
}