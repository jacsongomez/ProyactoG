import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCapComponent } from './crear-cap/crear-cap.component';
import { ListarCapComponent } from './listar-cap/listar-cap.component';

const routes: Routes = [
  {
    path: 'crearCap', component: CrearCapComponent
  },
  {
    path: 'listarCap', component: ListarCapComponent
  },
  {
    path: 'actualizarCap/:id_capacidad', component: CrearCapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacidadesRoutingModule { }
