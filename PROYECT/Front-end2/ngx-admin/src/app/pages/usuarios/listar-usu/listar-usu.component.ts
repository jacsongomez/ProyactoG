import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuarios } from '../../../modelos/usuarios.model';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-usu',
  templateUrl: './listar-usu.component.html',
  styleUrls: ['./listar-usu.component.scss']
})
export class ListarUsuComponent implements OnInit{
  usuario : Usuarios[];
  nombresColumnas: string[] = ['Nombre del Usuario','Correo','Contraseña','Rol','Opciones'];
  filteredUsuarios: Usuarios[] = [];
  p: number = 1; // Página actual para paginación
  loading: boolean = false; // Estado de carga

  constructor (private miServicioUsuario: UsuariosService, private router:Router){}
  
  ngOnInit(): void {
    this.listar();    
  }
  listar():void{
    this.loading = true;
    this.miServicioUsuario.listar().subscribe(
      data => {
        this.usuario=data;
        this.filteredUsuarios = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar los Usuarios', error);
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar los Usuarios', 'error');
      }
    );
  }
  agregar():void{
    console.log("agregando nuevo")
    this.router.navigate(["pages/usuarios/crearUsu"]);
  }
  editar(id:string):void{
    console.log("editando a "+id)
    this.router.navigate(["pages/usuarios/actualizarUsu/"+id]);
  }
  eliminar(id:string):void{
    Swal.fire({
      title: 'Eliminar Usuario',
      text: "Está seguro que quiere eliminar el Usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.miServicioUsuario.eliminar(id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado correctamente',
              'success'
            )
            this.listar();
          },
          error => {
            console.error('Error al eliminar el Usuario', error);
            Swal.fire('Error', 'No se pudo eliminar el Usuario', 'error');
          }
        );
      }
    })
  }

  buscar(term: string): void {
    if (term) {
      this.filteredUsuarios = this.usuario.filter(usuario => {
        // Verifica si la `persona` está definida antes de acceder a `identificacion`
        const seudonimo = usuario.seudonimo || '';
        // Filtra basándose únicamente en `grupo`
        return seudonimo.includes(term);
      });
    } else {
      // Si no hay término de búsqueda, muestra todas las asignaciones
      this.filteredUsuarios = this.usuario;
    }
  }  
}
