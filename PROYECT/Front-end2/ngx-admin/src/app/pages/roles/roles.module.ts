import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { ListarRolComponent } from './listar-rol/listar-rol.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CrearRolComponent,
    ListarRolComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    NbCardModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class RolesModule { }
