import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CRUDUsuariosPage } from './crud-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: CRUDUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CRUDUsuariosPageRoutingModule {}
