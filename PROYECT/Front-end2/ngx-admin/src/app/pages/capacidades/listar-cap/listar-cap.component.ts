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
  nombresColumnas: string[] = ['Nombre de la Capacidad Diversa','Tipo de la Capacidad','Opciones'];
  filteredCapacidades: Capacidad[] = [];
  p: number = 1; // Página actual para paginación
  loading: boolean = false; // Estado de carga
  constructor(private miServicioCapacidades: CapacidadesService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.loading = true;
    this.miServicioCapacidades.listar().subscribe(
      data => {
        this.capacidades=data;
        this.filteredCapacidades = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar las Capacidades', error);
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar las Capacidades. Porfavor inicia sesión', 'error');
      }
    );
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
        this.miServicioCapacidades.eliminar(id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'La capacidad ha sido eliminada correctamente',
              'success'
            )
            this.listar();
          },
          error => {
            console.error('Error al eliminar la Capacidad', error);
            Swal.fire('Error', 'No se pudo eliminar la Capacidad', 'error');
          }
        );
      }
    })
  }

  buscar(term: string): void {
    if (term) {
      this.filteredCapacidades = this.capacidades.filter(capacidad => {
        // Verifica si la `persona` está definida antes de acceder a `identificacion`
        const nombre = capacidad.nombre || '';
        // Filtra basándose únicamente en `grupo`
        return nombre.includes(term);
      });
    } else {
      // Si no hay término de búsqueda, muestra todas las asignaciones
      this.filteredCapacidades = this.capacidades;
    }
  }
}
