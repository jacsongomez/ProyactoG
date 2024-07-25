import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacidadesRoutingModule } from './capacidades-routing.module';
import { CrearCapComponent } from './crear-cap/crear-cap.component';
import { ListarCapComponent } from './listar-cap/listar-cap.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CrearCapComponent,
    ListarCapComponent
  ],
  imports: [
    CommonModule,
    CapacidadesRoutingModule,
    NbCardModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class CapacidadesModule { }
