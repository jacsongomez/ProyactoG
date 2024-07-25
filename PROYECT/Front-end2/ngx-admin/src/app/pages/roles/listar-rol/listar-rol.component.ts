import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Roles } from '../../../modelos/roles.model';
import { RolesService } from '../../../servicios/roles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.scss']
})
export class ListarRolComponent implements OnInit{
  rol : Roles[];
  nombresColumnas: string[] = ['Nombre de Rol','Descirpción','Opciones'];
  filteredRoles: Roles[] = [];
  p: number = 1; // Página actual para paginación
  loading: boolean = false; // Estado de carga

  constructor (private miServicioRol: RolesService, private router:Router){}
  
  ngOnInit(): void {
    this.listar();    
  }
  listar():void{
    this.loading = true;
    this.miServicioRol.listar().subscribe(
      data => {
        this.rol=data;
        this.filteredRoles = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar los Roles', error);
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar los Roles', 'error');
      }
    );
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/roles/crearRol"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/roles/actualizarRol/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Rol',
      text: "Está seguro que quiere eliminar el Rol?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioRol.eliminar(id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El rol ha sido eliminado correctamente',
              'success'
            )
            this.listar();
          },
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
      this.filteredRoles = this.rol.filter(rol => {
        // Verifica si la `persona` está definida antes de acceder a `identificacion`
        const nombre = rol.nombre || '';
        // Filtra basándose únicamente en `grupo`
        return nombre.includes(term);
      });
    } else {
      // Si no hay término de búsqueda, muestra todas las asignaciones
      this.filteredRoles = this.rol;
    }
  }
}
