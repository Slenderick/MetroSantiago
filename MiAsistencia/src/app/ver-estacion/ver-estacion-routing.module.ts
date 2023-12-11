import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerEstacionPage } from './ver-estacion.page';

const routes: Routes = [
  {
    path: '',
    component: VerEstacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerEstacionPageRoutingModule {}
