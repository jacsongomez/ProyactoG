import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BienvenidaComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class PrincipalModule { }
