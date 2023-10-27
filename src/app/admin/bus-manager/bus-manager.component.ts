import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusService } from 'src/app/service/bus.service';

@Component({
  selector: 'app-bus-manager',
  templateUrl: './bus-manager.component.html',
  styleUrls: ['./bus-manager.component.css']
})
export class BusManagerComponent {
  constructor(public busService: BusService, public spinner: NgxSpinnerService, private dialog: MatDialog) { }

  @ViewChild('ShowDetails') Details: any
  @ViewChild('ConfirmDeletion') Delete: any
  @ViewChild('Update')Update:any

  async ngOnInit() {
    this.spinner.show()
    await this.busService.GetAllBuses()
    this.spinner.hide()
  }

  async OpenDialog(dia: any, busid: number) {
    this.spinner.show()

    await this.busService.GetBusById(busid)

    this.updateForm = new FormGroup({
      id: new FormControl(this.busService.bus.id, [Validators.required]),
      vrp: new FormControl(this.busService.bus.vrp, [Validators.required, Validators.maxLength(30)]),
      model: new FormControl(this.busService.bus.model, [Validators.required, Validators.maxLength(10)]),
      brand: new FormControl(this.busService.bus.brand, [Validators.required, Validators.maxLength(50)]),
      licensedate: new FormControl(this.busService.bus.licensedate.substr(0,10), [Validators.required]),
      capacity: new FormControl(this.busService.bus.capacity, [Validators.required, Validators.min(1)]),
      statusid: new FormControl(this.busService.bus.statusid, [Validators.required]),
      image: new FormControl(this.busService.bus.image)
    })


    this.dialog.open(dia)
    this.spinner.hide()
    this.busService.busImage = ""
  }

  async DeleteBus(busid: number) {
    this.spinner.show()
    await this.busService.DeleteBus(busid)
    await this.busService.GetAllBuses()
    this.spinner.hide()
  }




  error: string = ''
  vrpError: string = ''
  capacityError: string = ''
  licensedateError: string = ''

  getErrorMessage(formField: FormControl, fieldName: string) {
    if (fieldName == 'vrp' && formField.value.length > 30) {
      this.error = `${fieldName} length must not exceed 30 characters`
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
      case 'licensedate': this.licensedateError = this.error; break
      case 'capacity': this.capacityError = this.error; break
    }
  }



  updateForm: any

  async UpdateBus() {
    this.spinner.show()
    await this.busService.UpdateBus(this.updateForm.value)
    await this.busService.GetAllBuses()
    await this.busService.GetBusById(this.updateForm.controls['id'].value)
    await this.OpenDialog(this.Details,this.busService.bus.id)
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
