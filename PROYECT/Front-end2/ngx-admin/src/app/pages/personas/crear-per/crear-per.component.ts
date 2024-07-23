import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Persona } from '../../../modelos/persona.model';
import { PersonasService } from '../../../servicios/personas.service';
import { Programa } from '../../../modelos/programa.model';
import { ProgramasService } from '../../../servicios/programas.service';

@Component({
  selector: 'ngx-crear-per',
  templateUrl: './crear-per.component.html',
  styleUrls: ['./crear-per.component.scss']
})
export class CrearPerComponent implements OnInit {
  modoCreacion: boolean = true;
  id_persona: string = "";
  intentoEnvio: boolean = false;
  laPersona: Persona = {
    identificacion: "",
    nombre: "",
    programa: "",
    grupo:"",
    tipo: ""
  }
  elprograma: Programa[]= [];

  constructor(private miServicioPersonas: PersonasService,
    private miServicioProgramas: ProgramasService, 
    private rutaActiva: ActivatedRoute, 
    private router: Router) { }
  
  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_persona) {
      this.modoCreacion = false;
      this.id_persona = this.rutaActiva.snapshot.params.id_persona;
      this.getPersona(this.id_persona)
      console.log(this.getPersona(this.id_persona))
    } else {
      this.modoCreacion = true;
    }
    this.getPrograma();
  }

  getPersona(id: string) {
    this.miServicioPersonas.getPersona(id).subscribe(data => {
      this.laPersona = data;
    });
  }

  getPrograma(){
    this.miServicioProgramas.listar().subscribe((data: Programa[]) => {
      this.elprograma = data;
    })
  }

  agregar(): void {
    if (this.validarDatosCompletos()) {
      this.intentoEnvio = true;
      this.miServicioPersonas.crear(this.laPersona).subscribe(data => {
        Swal.fire(
          'Creada',
          'La persona ha sido creada correctamente',
          'success'
        )
        this.router.navigate(["pages/personas/listarPer"]);
      });
    }
  }

  editar(): void {
    this.intentoEnvio = true;
    if (this.validarDatosCompletos()) {
      this.miServicioPersonas.editar(this.laPersona._id,this.laPersona).subscribe(data => {
        this.miServicioPersonas.asigProgram(this.laPersona._id,this.laPersona.programa,this.laPersona).subscribe(data => {});
        Swal.fire(
          'Actualizada',
          'La persona ha sido actualizada correctamente',
          'success'
        )
        this.router.navigate(["pages/personas/listarPer"]);
      });
    }
  }

  validarDatosCompletos():boolean{
    this.intentoEnvio=true;
    if(this.laPersona.identificacion=="" ||
      this.laPersona.nombre=="" ||
      this.laPersona.tipo==""){
        return false;
    }else{
      return true;
    }
  }

  cancelar() {
    // Navegar a la ruta deseada cuando se hace clic en Cancelar
    this.router.navigate(['pages/personas/listarPer']);
  }
}
