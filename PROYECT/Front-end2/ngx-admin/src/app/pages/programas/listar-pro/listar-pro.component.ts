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
  nombresColumnas: string[] = ['Codigo de Programa','Nombre de Programa','Facultad','Opciones'];
  filteredProgramas: Programa[] = [];
  p: number = 1; // Página actual para paginación
  loading: boolean = false; // Estado de carga
  constructor(private miServicioProgramas: ProgramasService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.loading = true;
    this.miServicioProgramas.listar().subscribe(
      data => {
        this.programas=data;
        this.filteredProgramas = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar los Programas', error);
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar los Programas', 'error');
      }
    );
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
        this.miServicioProgramas.eliminar(id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El programa ha sido eliminado correctamente',
              'success'
            )
            this.listar();
          },
          error => {
            console.error('Error al eliminar el Programa', error);
            Swal.fire('Error', 'No se pudo eliminar el Programa', 'error');
          }
        );
      }
    })
  }

  buscar(term: string): void {
    if (term) {
      this.filteredProgramas = this.programas.filter(programas => {
        // Verifica si la `persona` está definida antes de acceder a `identificacion`
        const codigo = programas.codigo || '';
        // Filtra basándose únicamente en `grupo`
        return codigo.includes(term);
      });
    } else {
      // Si no hay término de búsqueda, muestra todas las asignaciones
      this.filteredProgramas = this.programas;
    }
  }
}
