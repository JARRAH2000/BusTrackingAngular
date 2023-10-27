import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http: HttpClient,private toastr:ToastrService) { }

  published: any = []
  All: any = []
  testimonial:any=''
  async GetAllTestimonials() {
    return await new Promise<void>((resolve, reject) => {
        this.http.get("https://localhost:44338/api/testimonial/GetAllTestimonials").subscribe({
        next: (res) => {
          this.All = res,
          this.testimonial=this.All[0]
          resolve()
        },
        error: () => {
          reject()
        }
      })
    })
  }
  GetPublishedTestimonials() {
    this.http.get("https://localhost:44338/api/testimonial/GetPublishedTestimonials").subscribe({
      next: (res) => {
        this.published = res
      }
    })
  }

  async GetTestimonialById(id:number)
  {
    return await new Promise<void>((resolve,reject)=>{
      this.http.get("https://localhost:44338/api/testimonial/GetTestimonialById/"+id).subscribe({
        next:(res)=>{
          this.testimonial=res
          resolve()
        },
        error:()=>{reject()}
      })
    })
  }


  async CreateTestimonial(testimonial: any) {
    return await new Promise<void>((resolve,reject)=>{
      this.http.post("https://localhost:44338/api/testimonial/CreateTestimonial", testimonial).subscribe({
        next: () => {
          //this.toastr.success('send successfully')
          resolve()
        },
        error:()=>{
          //this.toastr.error('send failed')
          reject()
        }
      })
    })
    
  }

  async UpdateTestimonial(testimonial:any)
  {
    return await new Promise<void>((resolve,reject)=>{
      this.http.put("https://localhost:44338/api/testimonial/UpdateTestimonial",testimonial).subscribe({
      next:()=>{resolve()},
      error:()=>{reject()}
    })
    })
  }

  async DeleteTestimonial(id:number)
  {
    return await new Promise<void>((resolve,reject)=>{
      this.http.delete("https://localhost:44338/api/testimonial/DeleteTestimonial/"+id).subscribe({
      next:()=>{resolve()},
      error:()=>{reject()}
    })
    })
  }

  
}
