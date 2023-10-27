import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private spinner: NgxSpinnerService, public loginSerivce: LoginService) { }

  email = new FormControl('', [Validators.email, Validators.required, Validators.maxLength(256)])
  password = new FormControl('', [Validators.required, Validators.maxLength(256)])
  loginForm = new FormGroup({ email: this.email, password: this.password })

  //error message holder
  error: string = ''
  emailError: string = ''
  passwordError: string = ''
  getErrorMessage(formField: FormControl, fieldName: string) {
    if (formField.hasError('required')) {
      this.error = `You must enter your ${fieldName}`
    }
    else if (formField.hasError('maxlength')) {
      this.error = `${fieldName}length must not exceed 256 character`
    }
    else if (formField.hasValidator(Validators.email) && formField.hasError('email')) {
      this.error = 'Not a valid email';
    }
    else this.error = ''
    if (this.error != '') {
      if (fieldName == 'email') this.emailError = this.error;
      else this.passwordError = this.error
    }
  }

  async checkAllfileds() {
    this.getErrorMessage(this.email, 'email')
    this.getErrorMessage(this.password, 'password')
   
    if (this.loginForm.valid) {
      //debugger
      this.spinner.show()
      await this.loginSerivce.VerifyingLogin(this.loginForm.value)
      this.spinner.hide()

      debugger

      let invalidInfo = document.getElementById("invalidInfo") as HTMLElement
      invalidInfo.style.display="block"
    }
    else {
      console.log('error!')
    }
    //this.spinner.hide()
  }
}
