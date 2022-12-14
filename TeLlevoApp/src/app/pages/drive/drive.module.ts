import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrivePageRoutingModule } from './drive-routing.module';

import { DrivePage } from './drive.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrivePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [DrivePage]
})
export class DrivePageModule {}
