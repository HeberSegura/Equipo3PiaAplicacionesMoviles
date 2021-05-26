import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovDetailsPage } from './mov-details.page';

const routes: Routes = [
  {
    path: '',
    component: MovDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovDetailsPageRoutingModule {}
