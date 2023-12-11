import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerEstacionPageRoutingModule } from './ver-estacion-routing.module';

import { VerEstacionPage } from './ver-estacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VerEstacionPageRoutingModule
  ],
  declarations: [VerEstacionPage]
})
export class VerEstacionPageModule { }
