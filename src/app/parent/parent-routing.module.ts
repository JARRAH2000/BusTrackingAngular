import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { TestimonialComponent } from '../shared/testimonial/testimonial.component';
import { ChildrenComponent } from './children/children.component';
import { ParentViewComponent } from './parent-view/parent-view.component';
import { StartComponent } from './start/start.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path:"Children",
    component:ChildrenComponent
  },
  {
    path:"Profile",
    component:ProfileComponent
  },
  {
    path:"",
    component:StartComponent
  },
  {
    path:"ParentView",
    component:ParentViewComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
