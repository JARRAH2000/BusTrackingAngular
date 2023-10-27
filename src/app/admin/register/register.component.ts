import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, forwardRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { DriverService } from 'src/app/service/driver.service';
import { LoginService } from 'src/app/service/login.service';
import { ParentService } from 'src/app/service/parent.service';
import { RoleService } from 'src/app/service/role.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(public roleService: RoleService, public userService: UserService, private loginService: LoginService, private parentService: ParentService, private teacherService: TeacherService, private driverService: DriverService, private spinner: NgxSpinnerService,private toastr:ToastrService) { }
  ngOnInit() {
    this.spinner.show()
    this.roleService.GetAllRoles()
    this.spinner.hide()
  }
  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    middlename: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastname: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[0-9]{10}$/)]),
    birthdate: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.max(256)]),
    email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(256)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    roleid: new FormControl('', [Validators.required]),
    licensedate: new FormControl()
  })
  //error message holders
  error: string = ''
  fnameError: string = ''
  mnameError: string = ''
  lnameError: string = ''
  phoneError: string = ''
  birthDateError: string = ''
  licanseDateError: string = ''
  roleError: string = ''
  sexError: string = ''
  emailError: string = ''
  passwordError: string = ''
  confirmPasswordError: string = ''
  passwordMatch: string = ''
  getErrorMessage(formField: FormControl, fieldName: string) {
    if (formField.invalid && (formField.dirty || formField.touched)) {
      if (fieldName == 'phone')
        this.error = 'Enter a valid phone number of 10 digits only'
      else if (fieldName.includes('Name'))
        this.error = `${fieldName} length must not exceed 50 characters`
      else if (fieldName == 'email') {
        if (formField.value.length > 256)
          this.error = `${fieldName} length must not exceed 256 characters`
        else this.error = 'Not a valid email';
      }
    }
    else if (formField.hasValidator(Validators.required) && formField.hasError('required')) {
      this.error = `You must enter your ${fieldName}`
    }
    else if ((formField.value == null || formField.value == undefined || formField.value == "") && this.registerForm.controls['roleid'].value == '3' && fieldName == 'licensedate') {
      this.error = 'You must enter licanse expiration date for driver'
    }
    else this.error = ''
    if (this.error != '') {
      switch (fieldName) {
        case 'firstName': this.fnameError = this.error; break
        case 'middleName': this, this.mnameError = this.error; break
        case 'lastName': this.lnameError = this.error; break
        case 'phone': this.phoneError = this.error; break
        case 'birthdate': this.birthDateError = this.error; break
        case 'sex': this.sexError = this.error; break
        case 'email': this.emailError = this.error; break
        case 'password': this.passwordError = this.error; break
        case 'confirmPassword': this.confirmPasswordError = this.error; break
        case 'licansedate': this.licanseDateError = this.error; break
        case 'roleid': this.roleError = this.error; break
      }
    }
  }
  IsDriver(role: string) {
    const licesDate = document.getElementById('licensedate') as HTMLInputElement
    if (role == 'DRIVER') {
      licesDate.readOnly = false
      licesDate.required = true
    }
    else {
      licesDate.readOnly = true
      licesDate.required = false
    }
  }

  passwordsMatching(): Boolean { return this.registerForm.controls['password'].value == this.registerForm.controls['confirmPassword'].value }

  async checkAllFields() {
    if (!this.passwordsMatching()) {
      this.passwordMatch = 'passwords must be matched'
      console.log('mis passwords!')
    }
    else if (this.registerForm.valid) {
      sessionStorage.setItem('createdUser', JSON.stringify(this.registerForm.value))

      await this.loginService.IsEmailUsed(this.registerForm.controls['email'].value)
      if (this.loginService.isUnique == true) {

        console.log(sessionStorage.getItem('createdUser'))
        const jsonString = sessionStorage.getItem('createdUser');

        if (jsonString) {
          // Parse the JSON string to a JavaScript object
          const myData: { firstname: string; middlename: string; lastname: string; sex: string; birthdate: string; phone: string; roleid: number; image: string; email: string; password: string; licensedate: string } = JSON.parse(jsonString);

          await this.userService.CreateUser({
            firstname: myData.firstname,
            middlename: myData.middlename,
            lastname: myData.lastname,
            birthdate: myData.birthdate,
            sex: myData.sex,
            phone: myData.phone,
            roleid: myData.roleid,
            image: myData.image
          })

          if (this.userService.createdUserId) {
            this.toastr.success('registration success')
            await this.loginService.CreateLogin({
              email: myData.email,
              password: myData.password,
              userid: this.userService.createdUserId
            })
            
            if (myData.roleid == 4) {
              //debugger
              await this.parentService.CreateParent({
                userid: this.userService.createdUserId
              })
              if(this.parentService.createdParentId){
                this.toastr.success('parent added successfully')
                console.log('parent id : ' + this.parentService.createdParentId)
              }
              else{
                this.toastr.error('parent adding failed')
              }
            }
            else if (myData.roleid == 3) {
              await this.driverService.CreateDriver({
                userid: this.userService.createdUserId,
                licensedate: myData.licensedate,
                statusid: 2
              })
              if(this.driverService.createdDriverId){
                this.toastr.success('driver added successfully')
                console.log('driver id : ' + this.driverService.createdDriverId)
              }
              else{
                this.toastr.error('driver adding failed')
              }
            }
            else if (myData.roleid == 2) {
              await this.teacherService.CreateTeacher({
                userid: this.userService.createdUserId,
                statusid: 2
              })
              if(this.teacherService.createdTeacherId){
                this.toastr.success('teacher added successfully')
                console.log('teacher id : ' + this.teacherService.createdTeacherId)
              }
              else{
                this.toastr.error('teacher adding failed')
              }
            }
            else {
              this.toastr.success('admin added successfully')
              console.log('ADMIN IS ADDED')
            }
            
          }
          else {
            this.toastr.error('registration failed')
          }
          
        }
      }
      else {
        console.log('This email is used!')
      }
    }
    else {
      console.log('error!')
    }
  }

  async UploadUserImage(files: any) {
    if (files.length == 0) return;
    let formData = new FormData()
    formData.append('file', files[0])
    await this.userService.UplaodUserImage(formData)
    let img = document.getElementById("chosenImage") as HTMLImageElement
    let rem = document.getElementById("removeImage") as HTMLButtonElement
    let input=document.getElementById("image") as HTMLInputElement
    if (img) {
      img.src = "../../../assets/Images/" + this.userService.uploadedImage.image
      rem.style.display = "block"
      input.style.display="none"
    }
  }

  RemoveImage() {
    let img = document.getElementById("chosenImage") as HTMLImageElement
    let rem = document.getElementById("removeImage") as HTMLButtonElement
    let input=document.getElementById("image") as HTMLInputElement
    if (img) {
      img.src = "https://via.placeholder.com/150"
      rem.style.display = "none"
      this.userService.uploadedImage=""
      input.style.display="block"
    }
  }
}
  //return true iff both password and confirm password are identical
  //validate all fields
/* checkAllfileds() {
  this.getErrorMessage(this.firstName, 'firstName')
  this.getErrorMessage(this.middleName, 'middleName')
  this.getErrorMessage(this.lastName, 'lastName')
  this.getErrorMessage(this.phone, 'phone')
  this.getErrorMessage(this.birthDate, 'birthdate')
  this.getErrorMessage(this.sex, 'sex')
  this.getErrorMessage(this.email, 'email')
  this.getErrorMessage(this.password, 'password')
  this.getErrorMessage(this.confirmPassword, 'confirmPassword')
  if (!this.passwordsMatching()) {
    this.passwordMatch = 'passwords must be matched'
    console.log('mis passwords!')
  }
  else if (this.registerForm.valid) {
    console.log('done')
  }
  else {
    console.log('error!')
  }
} */
//}

