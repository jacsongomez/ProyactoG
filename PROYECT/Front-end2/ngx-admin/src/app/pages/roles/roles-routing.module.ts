import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { ListarRolComponent } from './listar-rol/listar-rol.component';

const routes: Routes = [
  {
    path: 'crearRol', component: CrearRolComponent
  },
  {
    path: 'listarRol', component: ListarRolComponent
  },
  {
    path: 'actualizarRol/:id_rol', component: CrearRolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
