import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsejosRoutingModule } from './consejos-routing.module';
import { CrearConsComponent } from './crear-cons/crear-cons.component';
import { ListarConsComponent } from './listar-cons/listar-cons.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CrearConsComponent,
    ListarConsComponent
  ],
  imports: [
    CommonModule,
    ConsejosRoutingModule,
    NbCardModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ConsejosModule { }
