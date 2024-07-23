import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProComponent } from './crear-pro/crear-pro.component';
import { ListarProComponent } from './listar-pro/listar-pro.component';

const routes: Routes = [
  {
    path: 'crearPro', component: CrearProComponent
  },
  {
    path: 'listarPro', component: ListarProComponent
  },
  {
    path: 'actualizarPro/:id_programa', component: CrearProComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramasRoutingModule { }
