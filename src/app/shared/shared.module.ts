import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CardComponent } from './card/card.component';
import { RowComponent } from './row/row.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardComponent,
    RowComponent,
    ViewProfileComponent,
    TestimonialComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CardComponent,
    RowComponent,
    ViewProfileComponent,
    TestimonialComponent,//

    HttpClientModule
  ]
})
export class SharedModule {

}