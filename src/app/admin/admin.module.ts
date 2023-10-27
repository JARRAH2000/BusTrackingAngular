import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StartComponent } from './start/start.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './register/register.component';
import { ContentComponent } from './content/content.component';
import { TestimonialManagerComponent } from './testimonial-manager/testimonial-manager.component';
import { MatDialogModule } from '@angular/material/dialog';

import { ContactManagerComponent } from './contact-manager/contact-manager.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreateStudentComponent } from './create-student/create-student.component';
import { TeacherManagerComponent } from './teacher-manager/teacher-manager.component';
import { CreateBusComponent } from './create-bus/create-bus.component';
import { ParentManagerComponent } from './parent-manager/parent-manager.component';
import { BusManagerComponent } from './bus-manager/bus-manager.component';
import { DriverManagerComponent } from './driver-manager/driver-manager.component';
import { StudentManagerComponent } from './student-manager/student-manager.component';
import { TripManagerComponent } from './trip-manager/trip-manager.component';



@NgModule({
  declarations: [
    DashboardComponent,
    StartComponent,
    SidebarComponent,
    NavigationComponent,
    RegisterComponent,
    ContentComponent,
    TestimonialManagerComponent,
    ContactManagerComponent,
    CreateStudentComponent,
    TeacherManagerComponent,
    CreateBusComponent,
    ParentManagerComponent,
    BusManagerComponent,
    DriverManagerComponent,
    StudentManagerComponent,
    TripManagerComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    RouterModule,
    MatDialogModule,
    NgxSpinnerModule   
  ],
  exports:[
    DashboardComponent,
    StartComponent,
    SidebarComponent,
    RegisterComponent,

  ]
})
export class AdminModule { }
