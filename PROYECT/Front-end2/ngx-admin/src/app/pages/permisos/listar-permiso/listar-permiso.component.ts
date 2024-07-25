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
  filteredPermisos: Permiso[] = [];
  p: number = 1; // Página actual para paginación
  loading: boolean = false; // Estado de carga

  constructor (private miServicioPermisos: PermisosService, private router:Router){}
  
  ngOnInit(): void {
    this.listar();    
  }
  listar():void{
    this.loading = true;
    this.miServicioPermisos.listar().subscribe(
      data => {
        this.permisos=data;
        this.filteredPermisos = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar los Permisos', error);
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar los Permisos', 'error');
      }
    );
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
        this.miServicioPermisos.eliminar(id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El permiso ha sido eliminada correctamente',
              'success'
            )
            this.listar();
          },
          error => {
            console.error('Error al eliminar el Permiso', error);
            Swal.fire('Error', 'No se pudo eliminar el Permiso', 'error');
          }
        );
      }
    })
  }

  buscar(term: string): void {
    if (term) {
      this.filteredPermisos = this.permisos.filter(Permisos => {
        // Verifica si la `persona` está definida antes de acceder a `identificacion`
        const permiso = Permisos.url || '';
        // Filtra basándose únicamente en `grupo`
        return permiso.includes(term);
      });
    } else {
      // Si no hay término de búsqueda, muestra todas las asignaciones
      this.filteredPermisos = this.permisos;
    }
  }
}
