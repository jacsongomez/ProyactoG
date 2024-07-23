import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPermisoComponent } from './crear-permiso/crear-permiso.component';
import { ListarPermisoComponent } from './listar-permiso/listar-permiso.component';

const routes: Routes = [
  {
    path:'listarPermiso', component:ListarPermisoComponent
  },
  {
    path:'crearPermiso', component:CrearPermisoComponent
  },
  {
    path:'actualizarPermiso/:id_permiso', component: CrearPermisoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermisosRoutingModule { }
