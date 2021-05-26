import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovDetailsPageRoutingModule } from './mov-details-routing.module';

import { MovDetailsPage } from './mov-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovDetailsPageRoutingModule
  ],
  declarations: [MovDetailsPage]
})
export class MovDetailsPageModule {}
