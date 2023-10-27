import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService: UserService, private router: Router, private loginService: LoginService, private spinner:NgxSpinnerService) {}
   

  profileForm = new FormGroup({
    id: new FormControl(sessionStorage.getItem('id'), [Validators.required]),
    firstname: new FormControl(sessionStorage.getItem('firstname'), [Validators.required, Validators.maxLength(50)]),
    middlename: new FormControl(sessionStorage.getItem('middlename'), [Validators.required, Validators.maxLength(50)]),
    lastname: new FormControl(sessionStorage.getItem('lastname'), [Validators.required, Validators.maxLength(50)]),
    phone: new FormControl(sessionStorage.getItem('phone'), [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]{10}$/)]),
    birthdate: new FormControl(sessionStorage.getItem('birthdate'), [Validators.required]),
    sex: new FormControl(sessionStorage.getItem('sex'), [Validators.required]),
    //image:new FormControl(sessionStorage.getItem('image'))
  })

  loginForm = new FormGroup({
    username: new FormControl(sessionStorage.getItem('USERNAME')),
    oldPassword: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    newPassword: new FormControl('', [Validators.required, Validators.maxLength(256)])
  })


  async UpdateUser() {
    debugger
    await this.userService.UpdateUser(this.profileForm.value)
    await this.userService.GetUserById(Number(sessionStorage.getItem('id')))
    sessionStorage.setItem('id', this.userService.loggedUser.id)
    sessionStorage.setItem('firstname', this.userService.loggedUser.firstname)
    sessionStorage.setItem('middlename', this.userService.loggedUser.middlename)
    sessionStorage.setItem('lastname', this.userService.loggedUser.lastname)
    sessionStorage.setItem('sex', this.userService.loggedUser.sex == 'M' ? "Male" : "Female")
    sessionStorage.setItem('birthdate', this.userService.loggedUser.birthdate.substring(0, 10))
    sessionStorage.setItem('phone', this.userService.loggedUser.phone)
    //sessionStorage.setItem('image',this.userService.loggedUser.image)
  }

  newPasswordError: string = ''
  oldPasswordError: string = ''
  async UpdateLoginData() {
    if (this.loginForm.controls['newPassword'].invalid && (this.loginForm.controls['newPassword'].touched || this.loginForm.controls['newPassword'].dirty)) {
      if (!this.loginForm.controls['newPassword'].value) this.newPasswordError = 'Enter the new password'
      else this.newPasswordError = 'Password length must not exceed 256 characters'
    }
    else if (this.loginForm.controls['oldPassword'].invalid && (this.loginForm.controls['oldPassword'].touched || this.loginForm.controls['oldPassword'].dirty)) {
      if (!this.loginForm.controls['oldPassword'].value) this.oldPasswordError = 'Enter the old password'
      else this.oldPasswordError = 'Password length must not exceed 256 characters'
    }
    else {
      console.log(sessionStorage.getItem('USERNAME'))
      await this.loginService.UpdateLoginData(this.loginForm.value)
    }
  }


  async ngAfterViewInit() {
    this.spinner.show()
    const user = localStorage.getItem('user')
    if (user) {
      let userInfo = JSON.parse(user)
      await this.userService.GetUserById(userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])

      sessionStorage.setItem('id',this.userService.loggedUser.id)
      sessionStorage.setItem('firstname',this.userService.loggedUser.firstname)
      sessionStorage.setItem('middlename',this.userService.loggedUser.middlename)
      sessionStorage.setItem('lastname',this.userService.loggedUser.lastname)
      sessionStorage.setItem('sex',this.userService.loggedUser.sex=='M'?"Male":"Female")
      sessionStorage.setItem('birthdate',this.userService.loggedUser.birthdate.substring(0,10))
      sessionStorage.setItem('phone',this.userService.loggedUser.phone)
      //sessionStorage.setItem('image',this.userService.loggedUser.image)


      let img = document.getElementById("chosenImage") as HTMLImageElement
      let rem = document.getElementById("removeImage") as HTMLButtonElement
      let input = document.getElementById("image") as HTMLInputElement
      debugger
      if (img&&this.userService.loggedUser.image!=null) {
        img.src = "../../../assets/Images/" + this.userService.loggedUser.image
        rem.style.display = "block"
        input.style.display = "none"
      }
    }
    else this.router.navigate(['Home/Login'])
    this.spinner.hide()
  }

  BackToDashboard() {
    const token = localStorage.getItem('token')
    if (token) {
      let userInfo: any = jwt_decode(token)
      switch (userInfo['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
        case "1": this.router.navigate(['Admin']); break
        case "2": this.router.navigate(['Teacher']); break
        case "3": this.router.navigate(['Driver']); break
        case "4": this.router.navigate(['Parent']); break
      }
    }
  }

  async UploadUserImage(files: any) {
    if (files.length == 0) return;
    let formData = new FormData()
    formData.append('file', files[0])
    await this.userService.UplaodUserImage(formData)
    let img = document.getElementById("chosenImage") as HTMLImageElement
    let rem = document.getElementById("removeImage") as HTMLButtonElement
    let input = document.getElementById("image") as HTMLInputElement
    if (img) {
      img.src = "../../../assets/Images/" + this.userService.uploadedImage.image
      rem.style.display = "block"
      input.style.display = "none"
    }
  }

  RemoveImage() {
    let img = document.getElementById("chosenImage") as HTMLImageElement
    let rem = document.getElementById("removeImage") as HTMLButtonElement
    let input = document.getElementById("image") as HTMLInputElement
    if (img) {
      img.src = "https://via.placeholder.com/150"
      rem.style.display = "none"
      this.userService.uploadedImage = ""
      input.style.display = "block"
    }
  }
}
