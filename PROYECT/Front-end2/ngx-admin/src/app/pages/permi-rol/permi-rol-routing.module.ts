import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPermiRolComponent } from './listar-permi-rol/listar-permi-rol.component';
import { CrearPermiRolComponent } from './crear-permi-rol/crear-permi-rol.component';

const routes: Routes = [
  {
    path:'listarPermiRol', component:ListarPermiRolComponent
  },
  {
    path:'crearPermiRol', component:CrearPermiRolComponent
  },
  {
    path:'actualizarPermiRol/:id_permiRol', component: CrearPermiRolComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermiRolRoutingModule { }
