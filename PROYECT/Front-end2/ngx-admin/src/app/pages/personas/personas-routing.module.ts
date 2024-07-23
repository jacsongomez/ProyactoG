import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPerComponent } from './crear-per/crear-per.component';
import { ListarPerComponent } from './listar-per/listar-per.component';

const routes: Routes = [
  {
    path: 'crearPer', component: CrearPerComponent
  },
  {
    path: 'listarPer', component: ListarPerComponent
  },
  {
    path: 'actualizarPer/:id_persona', component: CrearPerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
