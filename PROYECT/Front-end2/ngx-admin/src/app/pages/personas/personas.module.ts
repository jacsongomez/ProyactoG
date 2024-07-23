import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { ListarPerComponent } from './listar-per/listar-per.component';
import { CrearPerComponent } from './crear-per/crear-per.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarPerComponent,
    CrearPerComponent,
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class PersonasModule { }
