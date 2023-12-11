import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerCombinacionPageRoutingModule } from './ver-combinacion-routing.module';

import { VerCombinacionPage } from './ver-combinacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerCombinacionPageRoutingModule
  ],
  declarations: [VerCombinacionPage]
})
export class VerCombinacionPageModule {}
