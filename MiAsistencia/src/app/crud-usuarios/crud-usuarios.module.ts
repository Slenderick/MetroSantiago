import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CRUDUsuariosPageRoutingModule } from './crud-usuarios-routing.module';

import { CRUDUsuariosPage } from './crud-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CRUDUsuariosPageRoutingModule
  ],
  declarations: [CRUDUsuariosPage]
})
export class CRUDUsuariosPageModule {}
