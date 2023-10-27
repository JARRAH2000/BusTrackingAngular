import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { StudentComponent } from './student/student.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StartComponent } from './start/start.component';
import { ChildrenComponent } from './children/children.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ParentViewComponent } from './parent-view/parent-view.component';


@NgModule({
  declarations: [
    StudentComponent,
    SidebarComponent,
    ChildrenComponent,
    StartComponent,
    ParentViewComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    SharedModule,
    MatDialogModule
  ]
})
export class ParentModule { }
