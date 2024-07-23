import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramasRoutingModule } from './programas-routing.module';
import { CrearProComponent } from './crear-pro/crear-pro.component';
import { ListarProComponent } from './listar-pro/listar-pro.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearProComponent,
    ListarProComponent
  ],
  imports: [
    CommonModule,
    ProgramasRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class ProgramasModule { }
