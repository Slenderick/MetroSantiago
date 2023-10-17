import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecopiladorPageRoutingModule } from './recopilador-routing.module';

import { RecopiladorPage } from './recopilador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecopiladorPageRoutingModule
  ],
  declarations: [RecopiladorPage]
})
export class RecopiladorPageModule {}
