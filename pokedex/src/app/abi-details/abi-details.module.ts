import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbiDetailsPageRoutingModule } from './abi-details-routing.module';

import { AbiDetailsPage } from './abi-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbiDetailsPageRoutingModule
  ],
  declarations: [AbiDetailsPage]
})
export class AbiDetailsPageModule {}
