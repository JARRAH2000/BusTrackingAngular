import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestimonialComponent } from '../shared/testimonial/testimonial.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { TestimonialsliderComponent } from './testimonialslider/testimonialslider.component';

const routes: Routes = [
  {
    path:"About",
    component:AboutComponent
  },
  {
    path:"Contact",
    component:ContactComponent
  },
  {
    path:"Testimonials",
    component:TestimonialsliderComponent
  },
  {
    path:"",
    component:MainComponent
  },
  {
    path:"Main",
    component:MainComponent
  },
  {
    path:"Login",
    component:LoginComponent
  },
  {
    path:"Testimonial",
    component:TestimonialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
