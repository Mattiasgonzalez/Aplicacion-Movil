import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidePageRoutingModule } from './ride-routing.module';

import { RidePage } from './ride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidePageRoutingModule,
    ComponentsModule
  ],
  declarations: [RidePage]
})
export class RidePageModule {}
