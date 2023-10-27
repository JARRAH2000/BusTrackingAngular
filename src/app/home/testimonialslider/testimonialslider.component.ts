import { Component } from '@angular/core';
import { TestimonialService } from 'src/app/service/testimonial.service';


@Component({
  selector: 'app-testimonialslider',
  templateUrl: './testimonialslider.component.html',
  styleUrls: ['./testimonialslider.component.css']
  
})
export class TestimonialsliderComponent {
  constructor(public testimonialService:TestimonialService)
  {

  }
   ngOnInit()
  {
     this.testimonialService.GetPublishedTestimonials()
  }
}