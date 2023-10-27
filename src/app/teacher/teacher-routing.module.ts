import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { MapComponent } from './map/map.component';
import { AbsentStudentsComponent } from './absent-students/absent-students.component';
import { ToSchoolTripComponent } from './to-school-trip/to-school-trip.component';
import { ToHomeTripComponent } from './to-home-trip/to-home-trip.component';

const routes: Routes = [
  {
    path:"",
    component:StartComponent
  },
  {
    path:"CreateTrip",
    component:MapComponent
  },
  {
    path:"AbsentStudents",
    component:AbsentStudentsComponent
  },
  {
    path:"ToSchoolTrip",
    component:ToSchoolTripComponent
  },
  {
    path:"ToHomeTrip",
    component:ToHomeTripComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
