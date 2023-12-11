import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearEstacionPage } from './crear-estacion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearEstacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearEstacionPageRoutingModule {}
