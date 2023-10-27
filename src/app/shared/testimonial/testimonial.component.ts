import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { TestimonialService } from 'src/app/service/testimonial.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent {

  Job: any
  Name: any
  constructor(public testimonialService: TestimonialService, private userService: UserService, private router: Router, private spinner: NgxSpinnerService) {
    const token = localStorage.getItem('token')
    if (token) {
      let userInfo: any = jwt_decode(token)
      this.Name = userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      switch (userInfo['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
        case '1': this.Job = 'Admin'; break
        case '2': this.Job = 'Teacher'; break
        case '3': this.Job = 'Driver'; break
        case '4': this.Job = 'Parent'; break
      }
    }
    else this.router.navigate(['Home/Login'])
  }
  async ngAfterViewInit() {
    const user = localStorage.getItem('user')
    if (user) {
      let userInfo = JSON.parse(user)
      await this.userService.GetUserById(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])

      sessionStorage.setItem('id', this.userService.loggedUser.id)
      sessionStorage.setItem('firstname', this.userService.loggedUser.firstname)
      sessionStorage.setItem('middlename', this.userService.loggedUser.middlename)
      sessionStorage.setItem('lastname', this.userService.loggedUser.lastname)
      sessionStorage.setItem('sex', this.userService.loggedUser.sex == 'M' ? "Male" : "Female")
      sessionStorage.setItem('birthdate', this.userService.loggedUser.birthdate.substring(0, 10))
      sessionStorage.setItem('phone', this.userService.loggedUser.phone)
    }
    else this.router.navigate(['Home/Login'])
  }



  testimonialForm = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(500)])
  })

  async CreateTestimonial() {
    if (sessionStorage.getItem('id')) {
      this.spinner.show()
      let today = new Date()
      const testimonial = {
        message: this.testimonialForm.controls['message'].value,
        published: "N",
        userid: sessionStorage.getItem('id'),
        sendtime: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
      }
      //debugger
      await this.testimonialService.CreateTestimonial(testimonial)
      this.spinner.hide()
    }
    else this.router.navigate(['Home/Login'])
  }
}
