import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { HeaderComponent } from './shared/header/header.component';
import { ProfileComponent } from './profile/profile.component';
//import { TestimonialsliderComponent } from './home/testimonialslider/testimonialslider.component';
//import { FooterComponent } from './shared/footer/footer.component';
// { ContactComponent } from './home/contact/contact.component';
import { LoginComponent } from './home/login/login.component';
//import { StudentComponent } from './parent/student/student.component';
import { StudentslistComponent } from './studentslist/studentslist.component';
import { ListComponent } from './list/list.component';
import { BusComponent } from './bus/bus.component';
//import { AboutComponent } from './about/about.component';
//import { MapComponent } from './trip/map/map.component';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { MatDialogModule } from '@angular/material/dialog';

import { ToastrModule } from 'ngx-toastr';

import { NgChartsModule } from 'ng2-charts';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticaionInterceptor } from './interceptor';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MapComponent } from './teacher/map/map.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    StudentslistComponent,
    ListComponent,
    BusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    BrowserAnimationsModule,
    AdminModule,
    ToastrModule.forRoot(),
    
    
    NgChartsModule
    //HttpClientModule

  ],
  exports:[
    StudentslistComponent,
    MatDialogModule
  ],
  providers: [
   /*  {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthenticaionInterceptor,
      multi:true
    } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
