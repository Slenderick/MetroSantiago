import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEstacionPageRoutingModule } from './crear-estacion-routing.module';

import { CrearEstacionPage } from './crear-estacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearEstacionPageRoutingModule
  ],
  declarations: [CrearEstacionPage]
})
export class CrearEstacionPageModule {}
