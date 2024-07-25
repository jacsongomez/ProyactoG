import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermiRolRoutingModule } from './permi-rol-routing.module';
import { CrearPermiRolComponent } from './crear-permi-rol/crear-permi-rol.component';
import { ListarPermiRolComponent } from './listar-permi-rol/listar-permi-rol.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CrearPermiRolComponent,
    ListarPermiRolComponent
  ],
  imports: [
    CommonModule,
    PermiRolRoutingModule,
    NbCardModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class PermiRolModule { }
