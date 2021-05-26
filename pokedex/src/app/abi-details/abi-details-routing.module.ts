import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbiDetailsPage } from './abi-details.page';

const routes: Routes = [
  {
    path: '',
    component: AbiDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbiDetailsPageRoutingModule {}
