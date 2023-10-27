import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { HomeRoutingModule } from './home-routing.module';
import { ContactComponent } from './contact/contact.component';
import { TestimonialsliderComponent } from './testimonialslider/testimonialslider.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from '../parent/student/student.component';
import { StudentslistComponent } from '../studentslist/studentslist.component';
import { AppModule } from '../app.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    ContactComponent,
    TestimonialsliderComponent,
    AboutComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    SharedModule,
    NgxSpinnerModule
  ],
  exports:[
    ContactComponent,
    TestimonialsliderComponent,
    AboutComponent,
    MainComponent,
    
  ]
})
export class HomeModule {
  
 }
