import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsigCapRoutingModule } from './asig-cap-routing.module';
import { ListarAsigComponent } from './listar-asig/listar-asig.component';
import { CrearAsigComponent } from './crear-asig/crear-asig.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './detalle/detalle.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListarAsigComponent,
    CrearAsigComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    AsigCapRoutingModule,
    NbCardModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class AsigCapModule { }
