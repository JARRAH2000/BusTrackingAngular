import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { coerceStringArray } from '@angular/cdk/coercion';
import { ResourceLoader } from '@angular/compiler';
import { resolveObjectKey } from 'chart.js/dist/helpers/helpers.core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }
  createdDriverId: any
  driver: any
  allDrivers: any = []

  availableDrivers: any = []

  async GetAllDrivers() {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/driver/GetAllDrivers").subscribe({
        next: (res) => {
          this.allDrivers = res
          this.driver = this.allDrivers[0]
          console.log('fetch drivers sucess')
          resolve()
        },
        error: () => {
          console.log('fetch drivers failed')
          reject()
        }
      })
    })
  }

  async GetDriverById(driverid: number) {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/driver/GetDriverById/" + driverid).subscribe({
        next: (res) => {
          this.driver = res
          console.log('fetch driver id : ' + driverid + ' success')
          resolve()
        },
        error: () => {
          console.log('fetch driver with id : ' + driverid + ' failed')
          reject()
        }
      })
    })
  }

  async GetAvailableDrivers() {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/driver/GetAvailableDrivers").subscribe({
        next: (res) => {
          this.availableDrivers = res
          console.log('fetch available drivers sucess')
          resolve()
        },
        error: () => {
          console.log('fetch available drivers failed')
          reject()
        }
      })
    })
  }


  async CreateDriver(object: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44338/api/driver/CreateDriver", object).subscribe({
        next: (res) => {
          this.createdDriverId = res
          resolve()
        },
        error: () => {
          console.log('driver creation failed!!')
          reject()
        }
      })
    })
  }

  loggedDriver: any
  async GetDriverByUserId(userid: number) {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/driver/GetDriverByUserId/" + userid).subscribe({
        next: (res) => {
          this.loggedDriver = res
         // this.toastr.success("fetch driver successfully")
          resolve()
        },
        error: () => {
          //this.toastr.error("fetch driver failed!!")
          reject()
        }

      })
    })
  }

  async UpdateDriver(updatedDriver:any){
    return await new Promise<void>((resolve,reject)=>{
      this.http.put("https://localhost:44338/api/driver/UpdateDriver",updatedDriver).subscribe({
        next:()=>{
          //this.toastr.success('driver updated')
          resolve()
        },
        error:()=>{
          //this.toastr.error('update driver failed')
          reject()
        }
      })
    })
  }
  /* async DeleteDriver(driverid:number){
    return await new Promise<void>((resolve,reject)=>{
      this.http.delete("https://localhost:44338/api/driver/DeleteDriver/"+driverid).subscribe({
        next:()=>{
          console.log('driver deleted successfully')
          this.driver=""
          resolve()
        },
        error:()=>{
          console.log('driver deletion failed')
          reject()
        }
      })
    })
  } */
}
