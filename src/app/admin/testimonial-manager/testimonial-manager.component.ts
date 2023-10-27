import { Component, ViewChild } from '@angular/core';
import { TestimonialService } from 'src/app/service/testimonial.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { DomUtil } from 'leaflet';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-testimonial-manager',
  templateUrl: './testimonial-manager.component.html',
  styleUrls: ['./testimonial-manager.component.css']
})
export class TestimonialManagerComponent {
  constructor(public testimonials: TestimonialService, public dialog: MatDialog, private spinner: NgxSpinnerService) { }
  async ngOnInit() {
    this.spinner.show()
    await this.testimonials.GetAllTestimonials()
    this.spinner.hide()
  }

  @ViewChild('ShowDetails') Details: any
  @ViewChild('ConfirmDeletion') Delete: any

  from: any
  to: any
  async DateInterval() {
    this.spinner.show()
    let today = new Date();
    this.from = this.from == "" || this.from == undefined || this.from == null ? `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}` : this.from
    this.to = this.to == "" || this.to == undefined || this.to == null ? `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}` : this.to
    await this.testimonials.GetAllTestimonials()
    this.testimonials.All = this.testimonials.All.filter((test: any) => test.sendtime >= this.from + 'T00:00:00' && test.sendtime <= this.to + 'T23:59:59')
    this.spinner.hide()
  }
  
  async OpenDialog(dia: any, id: number) {
    this.spinner.show()
    await this.testimonials.GetTestimonialById(id)
    this.dialog.open(dia)
    this.spinner.hide()
  }

  async UpdateTestimonial(testimonial: any) {
    this.spinner.show()
    testimonial.published = testimonial.published == 'Y' ? 'N' : 'Y'
    await this.testimonials.UpdateTestimonial(testimonial)
    await this.testimonials.GetAllTestimonials()
    this.spinner.hide()
  }

  async DeleteTestimonial(id: number) {
    this.spinner.show()
    await this.testimonials.DeleteTestimonial(id)
    await this.testimonials.GetAllTestimonials()
    this.spinner.hide()
  }
}
