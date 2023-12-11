import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CrearEstacionPageRoutingModule } from './crear-estacion-routing.module';

import { CrearEstacionPage } from './crear-estacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearEstacionPageRoutingModule
  ],
  declarations: [CrearEstacionPage]
})
export class CrearEstacionPageModule { }
