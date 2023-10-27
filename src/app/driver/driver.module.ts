import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StartComponent } from './start/start.component';
import { DriverViewComponent } from './driver-view/driver-view.component';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


@NgModule({
  declarations: [
    SidebarComponent,
    StartComponent,
    DriverViewComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    NgxSpinnerModule
  ]
})
export class DriverModule { }
