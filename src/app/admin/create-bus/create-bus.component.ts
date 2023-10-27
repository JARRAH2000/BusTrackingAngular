import { Component } from '@angular/core';
import { BusService } from 'src/app/service/bus.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-create-bus',
  templateUrl: './create-bus.component.html',
  styleUrls: ['./create-bus.component.css']
})
export class CreateBusComponent {
  constructor(private busService: BusService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  busForm = new FormGroup({
    vrp: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    model: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    brand: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    licensedate: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [Validators.required, Validators.min(1)]),
    statusid: new FormControl(2, [Validators.required]),
    image: new FormControl()
  })

  error: string = ''
  vrpError: string = ''
  modelError: string = ''
  brandError: string = ''
  capacityError: string = ''
  licensedateError: string = ''

  getErrorMessage(formField: FormControl, fieldName: string) {
    if ((fieldName == 'brand' && formField.value.length > 50) || (fieldName == 'vrp' && formField.value.length > 30) || (fieldName == 'model' && formField.value.length > 10)) {
      this.error = `${fieldName} length must not exceed ${fieldName == 'brand' ? 50 : (fieldName == 'vrp' ? 30 : 10)} characters`
    }
    else if (fieldName == 'capacity' && formField.value <= 0) {
      this.error = 'bus capacity must be a positive integer number'
    }
    else if (formField.invalid) {
      this.error = `${fieldName} is required`
    }
    else this.error = ''
    switch (fieldName) {
      case 'vrp': this.vrpError = this.error; break;
      case 'model': this.modelError = this.error; break;
      case 'licensedate': this.licensedateError = this.error; break
      case 'brand': this.brandError = this.error; break
      case 'capacity': this.capacityError = this.error; break
    }
  }


  async CreateBus() {
    this.spinner.show()
    if (this.busForm.valid) {
      await this.busService.CreateBus(this.busForm.value)
      if (this.busService.createBusId == -1) this.toastr.error('This is used VRP')
      else this.toastr.success('bus add to the system')
    }
    else {
      this.getErrorMessage(this.busForm.controls['vrp'], 'vrp')
      this.getErrorMessage(this.busForm.controls['model'], 'model')
      this.getErrorMessage(this.busForm.controls['brand'], 'brand')
      this.getErrorMessage(this.busForm.controls['capacity'], 'capacity')
      this.getErrorMessage(this.busForm.controls['licensedate'], 'licensedate')
    }
    this.spinner.hide()
  }

  async UploadBusImage(files: any) {
    if (files.length == 0) return;
    let formData = new FormData()
    formData.append('file', files[0])
    await this.busService.UploadBusImage(formData)

    let input = document.getElementById("image") as HTMLInputElement
    let button = document.getElementById("remove") as HTMLButtonElement
    let img = document.getElementById("chosenImage") as HTMLImageElement
    if (img) {
      input.style.display = "none"
      button.style.display = "block"
      img.src = "../../../assets/Images/" + this.busService.busImage.image
    }
  }

  removeImage() {
    let input = document.getElementById('image') as HTMLInputElement
    let button = document.getElementById('remove') as HTMLButtonElement
    let img = document.getElementById('chosenImage') as HTMLImageElement
    if (img) {
      input.style.display = "block"
      button.style.display = "none"
      img.src = "https://via.placeholder.com/150"
      this.busService.busImage = ""
    }
  }
}
