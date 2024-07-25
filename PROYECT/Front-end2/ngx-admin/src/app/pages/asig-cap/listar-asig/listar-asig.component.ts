import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AsigCap } from '../../../modelos/asig-cap.model';
import { AsigCapService } from '../../../servicios/asig-cap.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-asig',
  templateUrl: './listar-asig.component.html',
  styleUrls: ['./listar-asig.component.scss']
})
export class ListarAsigComponent implements OnInit {
  asignaciones: AsigCap[] = [];
  nombresColumnas: string[] = ['Persona', 'Grupo', 'Capacidad Diversa', 'Grado de la Capacidad', 'Fecha de Diagnostico', 'Descripción', 'Opciones'];
  filteredAsignaciones: AsigCap[] = [];
  p: number = 1; // Página actual para paginación
  loading: boolean = false; // Estado de carga

  constructor(private miServicioAsignaciones: AsigCapService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.loading = true;
    this.miServicioAsignaciones.listar().subscribe(
      data => {
        this.asignaciones = data;
        this.filteredAsignaciones = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar las Asignaciones', error);
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar las Asignaciones', 'error');
      }
    );
  }

  detallePer(id: string): void {
    this.router.navigate([`pages/asigCap/detalleAsig/${id}`]);
  }

  agregar(): void {
    this.router.navigate(['pages/asigCap/crearAsig']);
  }

  editar(id: string): void {
    this.router.navigate([`pages/asigCap/actualizarAsig/${id}`]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: 'Eliminar Asignación',
      text: '¿Está seguro que quiere eliminar la asignación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioAsignaciones.eliminar(id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'La asignación ha sido eliminada correctamente',
              'success'
            );
            this.listar();
          },
          error => {
            console.error('Error al eliminar la asignación', error);
            Swal.fire('Error', 'No se pudo eliminar la asignación', 'error');
          }
        );
      }
    });
  }

  buscar(term: string): void {
    if (term) {
      this.filteredAsignaciones = this.asignaciones.filter(asignacion => {
        // Verifica si la `persona` está definida antes de acceder a `identificacion`
        const grupo = asignacion.persona?.grupo || '';
        // Filtra basándose únicamente en `grupo`
        return grupo.includes(term);
      });
    } else {
      // Si no hay término de búsqueda, muestra todas las asignaciones
      this.filteredAsignaciones = this.asignaciones;
    }
  }  
}
