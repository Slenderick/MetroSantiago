import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerCombinacionPage } from './ver-combinacion.page';

const routes: Routes = [
  {
    path: '',
    component: VerCombinacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerCombinacionPageRoutingModule {}
