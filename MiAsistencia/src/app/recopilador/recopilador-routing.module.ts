import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecopiladorPage } from './recopilador.page';

const routes: Routes = [
  {
    path: '',
    component: RecopiladorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecopiladorPageRoutingModule {}
