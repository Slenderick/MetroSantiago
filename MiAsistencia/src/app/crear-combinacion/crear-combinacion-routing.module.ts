import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearCombinacionPage } from './crear-combinacion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearCombinacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearCombinacionPageRoutingModule {}
