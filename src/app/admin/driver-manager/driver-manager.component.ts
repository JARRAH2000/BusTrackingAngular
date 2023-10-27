import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { DriverService } from 'src/app/service/driver.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-driver-manager',
  templateUrl: './driver-manager.component.html',
  styleUrls: ['./driver-manager.component.css']
})
export class DriverManagerComponent {
  constructor(public driverService:DriverService,public spinner:NgxSpinnerService,private dialog:MatDialog,private userService:UserService){}

  @ViewChild('ShowDetails')Details:any
  @ViewChild('ConfirmDeletion')Delete:any  
  @ViewChild('Update')Update : any

  async ngOnInit(){
    this.spinner.show()
    await this.driverService.GetAllDrivers()
    this.spinner.hide()
  }

  async OpenDialog(dia:any,driverid:number){
    this.spinner.show()
    await this.driverService.GetDriverById(driverid)
    debugger
    this.UpdateForm=new FormGroup({
      id:new FormControl(String(this.driverService.driver.id),[Validators.required]),
      statusid:new FormControl(String(this.driverService.driver.statusid),[Validators.required]),
      licensedate:new FormControl(String(this.driverService.driver.licensedate.substring(0,10)),[Validators.required])
    })
    this.dialog.open(dia)
    this.spinner.hide()
  }

  UpdateForm:any

  async UpdateDriver(){
    this.spinner.show()
    debugger
    await this.driverService.UpdateDriver({
      id:Number(this.UpdateForm.controls['id'].value),
      statusid:Number(this.UpdateForm.controls['statusid'].value),
      licensedate:this.UpdateForm.controls['licensedate'].value
    })
    await this.driverService.GetDriverById(this.driverService.driver.id)
    await this.driverService.GetAllDrivers()

    this.spinner.hide()
  }


  async DeleteDriver(id:number){
    this.spinner.show()
    this.userService.DeleteUser(id)
    await this.driverService.GetAllDrivers()
    this.spinner.hide()
  }
}
