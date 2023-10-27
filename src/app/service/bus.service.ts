import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { resolveObjectKey } from 'chart.js/dist/helpers/helpers.core';
import { RouterTestingHarness } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { coerceStringArray } from '@angular/cdk/coercion';
@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http: HttpClient,private toastr:ToastrService) { }
  busImage: any
  createBusId: any = ''
  allBuses: any = []

  avaliableBuses:any=[]
  bus: any
  async GetAllBuses() {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/bus/GetAllBuses").subscribe({
        next: (res) => {
          this.allBuses = res
          //this.bus = this.allBuses[0]
          console.log('fetch buses success')
          resolve()
        },
        error: () => {
          console.log('fetch buses failed')
          reject()
        }
      })
    })
  }

  async GetBusById(id: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/bus/GetBusById/" + id).subscribe({
        next: (res) => {
          this.bus = res
          console.log('fetch bus ' + id + ' successfully')
          resolve()
        },
        error: () => {
          console.log('fetch bus ' + id + ' failed')
          reject()
        }
      })
    })
  }

  async GetAvailableBuses() {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/bus/GetAvailableBuses").subscribe({
        next: (res) => {
          this.avaliableBuses = res
          console.log('fetch available buses successfully')
          resolve()
        },
        error: () => {
          console.log('fetch available buses failed')
          reject()
        }
      })
    })
  }





  async CreateBus(object: any) {
    if (this.busImage != "" && this.busImage != undefined && this.busImage != null) {
      object.image = this.busImage.image
    }
    return await new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44338/api/bus/CreateBus", object).subscribe({
        next: (res) => {
          this.createBusId = res
          console.log('bus created successfully')
          resolve()
        },
        error: () => {
          console.log('bus creation failed!!')
          this.createBusId = -1
          reject()
        }
      })
    })
  }

  async UpdateBus(object:any){
    if (this.busImage != "" && this.busImage != undefined && this.busImage != null) {
      object.image = this.busImage.image
    }
    return await new Promise<void>((resolve, reject) => {
      this.http.put("https://localhost:44338/api/bus/UpdateBus", object).subscribe({
        next: () => {
          //this.toastr.success('bus updated successfully')
          console.log('bus update successfully')
          resolve()
        },
        error: () => {
          //this.toastr.error('bus update failed')
          console.log('bus update failed!!')
          reject()
        }
      })
    })
  }

  async UploadBusImage(img: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44338/api/bus/UploadBusImage", img).subscribe({
        next: (res) => {
          this.busImage = res
          console.log('bus image uploaded successfully')
          resolve()
        },
        error: () => {
          console.log('upload image bus failed!!')
          reject()
        }
      })
    })
  }


  async DeleteBus(busid:number){
    return await new Promise<void>((resolve,reject)=>{
      this.http.delete("https://localhost:44338/api/bus/DeleteBus/"+busid).subscribe({
        next:()=>{
          console.log('bus deleted successfully')
          //this.toastr.success('bus deleted successfully')
          resolve()
        },
        error:()=>{
          console.log('bus deletion failed')
          //this.toastr.error('bus deletion failed')
          reject()
        }
      })
    })
  }
}
