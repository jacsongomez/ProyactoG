import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisosRoutingModule } from './permisos-routing.module';
import { CrearPermisoComponent } from './crear-permiso/crear-permiso.component';
import { ListarPermisoComponent } from './listar-permiso/listar-permiso.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CrearPermisoComponent,
    ListarPermisoComponent
  ],
  imports: [
    CommonModule,
    PermisosRoutingModule,
    NbCardModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class PermisosModule { }
