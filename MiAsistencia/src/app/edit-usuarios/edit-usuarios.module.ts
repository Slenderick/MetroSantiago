import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUsuariosPageRoutingModule } from './edit-usuarios-routing.module';

import { EditUsuariosPage } from './edit-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUsuariosPageRoutingModule
  ],
  declarations: [EditUsuariosPage]
})
export class EditUsuariosPageModule {}
