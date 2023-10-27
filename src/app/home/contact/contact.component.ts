import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContentService } from 'src/app/service/content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(public contentService:ContentService){}
  /* ngOnInit()
  {
    this.contentService.GetAllContent()
  }
   */


  name = new FormControl('', [Validators.required, Validators.maxLength(50)])
  email = new FormControl('', [Validators.email, Validators.required, Validators.maxLength(256)])
  title = new FormControl('', [Validators.required, Validators.maxLength(50)])
  message = new FormControl('', [Validators.required, Validators.maxLength(500)])
  formgroup = new FormGroup([this.name, this.email, this.title, this.message])

  //error message holders
  error: string = '';
  nameError: string = '';
  emailError: string = '';
  messageError: string = '';
  titleError: string = '';
  //check error for a specific field
  getErrorMessage(formField: FormControl, fieldName: string) {
    if (formField.invalid && (formField.dirty || formField.touched)) {
      if (fieldName == 'email') {
        if (formField.value.length > 256)
          this.error = `${fieldName} length must not exceed 256 characters`
        else this.error = 'Not a valid email';
      }
      else this.error = `${fieldName} length must not exceed 50 characters`
    }
    else if (formField.hasValidator(Validators.required) && formField.hasError('required')) {
      this.error = `You must enter ${fieldName == 'email' ? 'an' : 'a'} ${fieldName}`;
    }
    else this.error = '';
    if (this.error != '') {
      switch (fieldName) {
        case 'email': this.emailError = this.error; break
        case 'title': this.titleError = this.error; break
        case 'name': this.nameError = this.error; break;
        case 'message': this.messageError = this.error; break
      }
    }
  }
  //validate the form
  checkAllfileds() {
    this.getErrorMessage(this.name, 'name')
    this.getErrorMessage(this.email, 'email')
    this.getErrorMessage(this.title, 'title')
    this.getErrorMessage(this.message, 'message')
    if (this.formgroup.valid) {
      console.log('done')
    }
    else {
      console.log('error!')
    }
  }

  
}
