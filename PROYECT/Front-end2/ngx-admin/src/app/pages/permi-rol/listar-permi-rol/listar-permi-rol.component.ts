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
  filteredPermisoRol: PermisoRol[] = [];
  p: number = 1; // Página actual para paginación
  loading: boolean = false; // Estado de carga
  constructor (private miServicioPermiRol: PermiRolService, private router:Router){}
  
  ngOnInit(): void {
    this.listar();    
  }
  listar():void{
    this.loading = true;
    this.miServicioPermiRol.listar().subscribe(
      data => {
        this.permisoRol=data;
        this.filteredPermisoRol = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar los Permisos Roles', error);
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar los Permisos Roles', 'error');
      }
    );
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
        this.miServicioPermiRol.eliminar(id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El permiso-rol ha sido eliminada correctamente',
              'success'
            )
            this.listar();
          }
          ,
          error => {
            console.error('Error al eliminar la asignación', error);
            Swal.fire('Error', 'No se pudo eliminar la asignación', 'error');
          }
        );
      }
    })
  }

  buscar(term: string): void {
    if (term) {
      this.filteredPermisoRol = this.permisoRol.filter(permisoRol => {
        // Verifica si la `persona` está definida antes de acceder a `identificacion`
        const nombre = permisoRol.rol.nombre || '';
        // Filtra basándose únicamente en `grupo`
        return nombre.includes(term);
      });
    } else {
      // Si no hay término de búsqueda, muestra todas las asignaciones
      this.filteredPermisoRol = this.permisoRol;
    }
  }
}
