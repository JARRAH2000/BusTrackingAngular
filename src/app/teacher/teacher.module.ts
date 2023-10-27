import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { StartComponent } from './start/start.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapComponent } from './map/map.component';
import { ToHomeTripComponent } from './to-home-trip/to-home-trip.component';
import { ToSchoolTripComponent } from './to-school-trip/to-school-trip.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AbsentStudentsComponent } from './absent-students/absent-students.component';

@NgModule({
  declarations: [
    StartComponent,
    SidebarComponent,
    MapComponent,
    ToHomeTripComponent,    
    ToSchoolTripComponent, AbsentStudentsComponent

  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NgxSpinnerModule,
    RouterModule,
    FormsModule,
    MatDialogModule


  ]
})
export class TeacherModule { }
