import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCombinacionPageRoutingModule, } from './crear-combinacion-routing.module';

import { CrearCombinacionPage } from './crear-combinacion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CrearCombinacionPageRoutingModule
  ],
  declarations: [CrearCombinacionPage]
})
export class CrearCombinacionPageModule { }
