import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAsigComponent } from './crear-asig/crear-asig.component';
import { ListarAsigComponent } from './listar-asig/listar-asig.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  {
    path: 'crearAsig', component: CrearAsigComponent
  },
  {
    path: 'listarAsig', component: ListarAsigComponent
  },
  {
    path: 'actualizarAsig/:id_asignacion', component: CrearAsigComponent
  },
  {
    path: 'detalleAsig/:id_asignacion', component: DetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsigCapRoutingModule { }
