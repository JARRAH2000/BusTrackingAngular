import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http:HttpClient,private toastr:ToastrService) { }
  createdTripId:any
  allTrips:any=[]
  runningTrip:any

  async GetAllTrips(){
    return await new Promise<void>((resolve,reject)=>{
      this.http.get("https://localhost:44338/api/Trip/GetAllTrips").subscribe({
        next:(res)=>{
          this.allTrips=res
          //this.toastr.success('done')
          resolve()
        },
        error:()=>{
          //this.toastr.error('failed')
          reject()
        }
      })
    })
  }

  async GetTripById(tripid:number){
    return await new Promise<void>((resolve,reject)=>{
      this.http.get("https://localhost:44338/api/Trip/GetTripById/"+tripid).subscribe({
        next:(res)=>{
          this.runningTrip=res
          //this.toastr.success('Current Trip Successfully')
          resolve()
        },
        error:()=>{
          //this.toastr.error('Current Trip Failed!!')
          console.log('FAILEEEEEEED  :   '+ tripid)
          reject()
        }
      })
    })
  }

  async CreateTrip(trip:any){
    return await new Promise<void>((resolve,reject)=>{
      this.http.post("https://localhost:44338/api/Trip/CreateTrip",trip).subscribe({
      next:(res)=>{
        this.createdTripId=res
        //this.toastr.success("Trip started")
        resolve()
      },
      error:()=>{
        console.log('create trip failed!')
        //this.toastr.error("trip failed")
        reject()
      }
      })
    })
  }

  async EndTrip(trip:any){
    return await new Promise<void>((resolve,reject)=>{
      this.http.put("https://localhost:44338/api/Trip/EndTrip",trip).subscribe({
        next:()=>{
          //this.toastr.success("Trip end successfully")
          resolve()
        },
        error:()=>{
          //this.toastr.error("Trip failed!")
          reject()
        }
      })
    })
  }

  async UpdateTrip(trip:any){
    return await new Promise<void>((resolve,reject)=>{
      this.http.put("https://localhost:44338/api/Trip/UpdateTrip",trip).subscribe({
        next:()=>{
          //this.toastr.success('LOCATION updated successfully')
          resolve()
        },
        error:()=>{
          //this.toastr.error('LOCATION update failed')
          reject()
        }
      })
    })
  }

  TripDetailsForParent:any
  async TripDetails(tripid:number){
    return await new Promise<void>((resolve,reject)=>{
      this.http.get("https://localhost:44338/api/Trip/GetTripDetails/"+tripid).subscribe({
        next:(res)=>{
          //debugger
          this.TripDetailsForParent=res
          //this.toastr.success('trip fetched successfully')
          resolve()
        },
        error:()=>{
          //this.toastr.error('fetch trip detaild failed!')
          reject()
        }
      })
    })
  }

  tripReport:any=[]
  async CountOfTripsEachMonth(){
    return await new Promise<void>((resolve,reject)=>{
      this.http.get("https://localhost:44338/api/Trip/CountOfTripsEachMonth").subscribe({
        next:(res)=>{
          this.tripReport=res
          console.log(res)
          resolve()
        },
        error:()=>{
          reject()
        }
      })
    })
  }
}
