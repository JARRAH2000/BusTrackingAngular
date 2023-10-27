import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverViewComponent } from './driver-view/driver-view.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {
    path:"",
    component:StartComponent
  },
  {
    path:"DriverView",
    component:DriverViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
