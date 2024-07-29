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
  nombresColumnas: string[] = ['N° de Identificación','Nombres y apellidos','programa','grupo','tipo ','Opciones'];
  filteredPersonas: Persona[] = [];
  p: number = 1; // Página actual para paginación
  loading: boolean = false; // Estado de carga

  constructor(private miServicioPersonas: PersonasService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.loading = true;
    this.miServicioPersonas.listar().subscribe(
      data => {
        this.personas=data;
        this.filteredPersonas = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar las Personas', error);
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar las Personas. Porfavor inicia sesión', 'error');
      }
    );
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
        this.miServicioPersonas.eliminar(id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'La persona ha sido eliminado correctamente',
              'success'
            )
            this.listar();
          },
          error => {
            console.error('Error al eliminar la Persona', error);
            Swal.fire('Error', 'No se pudo eliminar la Persona', 'error');
          }
        );
      }
    })
  }

  buscar(term: string): void {
    if (term) {
      this.filteredPersonas = this.personas.filter(personas => {
        // Verifica si la `persona` está definida antes de acceder a `identificacion`
        const identificacion = personas.identificacion || '';
        // Filtra basándose únicamente en `grupo`
        return identificacion.includes(term);
      });
    } else {
      // Si no hay término de búsqueda, muestra todas las asignaciones
      this.filteredPersonas = this.personas;
    }
  }  
}
