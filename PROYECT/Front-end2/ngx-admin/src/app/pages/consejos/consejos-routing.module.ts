import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearConsComponent } from './crear-cons/crear-cons.component';
import { ListarConsComponent } from './listar-cons/listar-cons.component';

const routes: Routes = [
  {
    path: 'crearCons', component: CrearConsComponent
  },
  {
    path: 'listarCons', component: ListarConsComponent
  },
  {
    path: 'actualizarCons/:id_consejo', component: CrearConsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsejosRoutingModule { }