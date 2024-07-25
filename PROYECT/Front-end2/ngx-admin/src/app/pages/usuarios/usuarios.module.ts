import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { CrearUsuComponent } from './crear-usu/crear-usu.component';
import { ListarUsuComponent } from './listar-usu/listar-usu.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CrearUsuComponent,
    ListarUsuComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    NbCardModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class UsuariosModule { }
