import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuComponent } from './crear-usu/crear-usu.component';
import { ListarUsuComponent } from './listar-usu/listar-usu.component';

const routes: Routes = [
  {
    path: 'crearUsu', component: CrearUsuComponent
  },
  {
    path: 'listarUsu', component: ListarUsuComponent
  },
  {
    path: 'actualizarUsu/:id_usuario', component: CrearUsuComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
