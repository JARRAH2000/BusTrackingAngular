import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { BusManagerComponent } from './bus-manager/bus-manager.component';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';
import { ContentComponent } from './content/content.component';
import { CreateBusComponent } from './create-bus/create-bus.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriverManagerComponent } from './driver-manager/driver-manager.component';
import { ParentManagerComponent } from './parent-manager/parent-manager.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';
import { StudentManagerComponent } from './student-manager/student-manager.component';
import { TeacherManagerComponent } from './teacher-manager/teacher-manager.component';
import { TestimonialManagerComponent } from './testimonial-manager/testimonial-manager.component';
import { TripManagerComponent } from './trip-manager/trip-manager.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent
  },
  {
    path:"Admin/Dashboard",
    component:DashboardComponent
  },
  {
    path:"Admin/Profile",
    component:ProfileComponent
  },
  {
    path:"Admin/Register",
    component:RegisterComponent
  },
  {
    path:"Admin/Content",
    component:ContentComponent
  },
  {
    path:"Admin/TestimonialManager",
    component:TestimonialManagerComponent
  },
  {
    path:"Admin/Messages",
    component:ContactManagerComponent
  },
  {
    path:"Admin/CreateStudent",
    component:CreateStudentComponent
  },
  {
    path:"Admin/TeacherManager",
    component:TeacherManagerComponent
  },
  {
    path:"Admin/CreateBus",
    component:CreateBusComponent
  },
  {
    path:"Admin/ParentManager",
    component:ParentManagerComponent
  },
  {
    path:"Admin/BusManager",
    component:BusManagerComponent
  },
  {
    path:"Admin/DriverManager",
    component:DriverManagerComponent
  },
  {
    path:"Admin/StudentManager",
    component:StudentManagerComponent
  },
  {
    path:"Admin/TripManager",
    component:TripManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
