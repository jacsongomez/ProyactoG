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
  consejos : Consejo[];
  nombresColumnas: string[] = ['Consejo','Momento de Aplicación','Capacidad Diversa','Grado de la Capacidad','Opciones'];
  filteredConsejos: Consejo[] = [];
  p: number = 1; // Página actual para paginación
  loading: boolean = false; // Estado de carga

  constructor(private miServicioConsejos: ConsejosService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar():void{
    this.loading = true;
    this.miServicioConsejos.listar().subscribe(
      data => {
      this.consejos=data;
      this.filteredConsejos = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar los Consejos', error);
        this.loading = false;
        Swal.fire('Error', 'No se pudieron cargar los Consejos', 'error');
      }
    );
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
        this.miServicioConsejos.eliminar(id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El Consejo ha sido eliminado correctamente',
              'success'
            )
            this.listar();
          },
          error => {
            console.error('Error al eliminar el consejo', error);
            Swal.fire('Error', 'No se pudo eliminar el consejo', 'error');
          }
        );
      }
    });
  }

  buscar(term: string): void {
    if (term) {
      this.filteredConsejos = this.consejos.filter(consejo => {
        // Verifica si la `persona` está definida antes de acceder a `identificacion`
        const nombre = consejo.capacidad.nombre || '';
        // Filtra basándose únicamente en `grupo`
        return nombre.includes(term);
      });
    } else {
      // Si no hay término de búsqueda, muestra todas las asignaciones
      this.filteredConsejos = this.consejos;
    }
  }
}