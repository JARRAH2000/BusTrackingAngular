import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
@Injectable({
  providedIn: 'root'
})
export class TripstudentService {

  constructor(private http:HttpClient,private toastr:ToastrService) { }

  async UpdateStudentTrip(tripstudent:any){
    return await new Promise<void>((resolve,reject)=>{
      this.http.put("https://localhost:44338/api/TripStudent/UpdateTripStudent",tripstudent).subscribe({
        next:()=>{
          //this.toastr.success("arrival time setted successfully")
          resolve()
        },
        error:()=>{
          //this.toastr.error("arrival time failed!!")
          reject()
        }
      })
    })
  }

  async CreateTripStudent(tripstudent:any){
    return await new Promise<void>((resolve,reject)=>{
      this.http.post("https://localhost:44338/api/TripStudent/CreateTripStudent",tripstudent).subscribe({
        next:()=>{
          console.log('adding student to the trip done successfully')
         // this.toastr.success('student added to the trip successfully')
          resolve()
        },
        error:()=>{
          console.log('adding student to the trip failed')
         // this.toastr.error('adding student to the trip failed')
          reject()
        }
      })
    })
  }

  studentsInTrip:any=[]
  async GetTripStudentsByTripId(tripId:number){
    return await new Promise<void>((resolve,reject)=>{
      this.http.get("https://localhost:44338/api/TripStudent/GetTripStudentsByTripId/"+tripId).subscribe({
        next:(res)=>{
          this.studentsInTrip=res
          //this.toastr.success("fetch trip in students done successfully")
          resolve()
        },
        error:()=>{
          //this.toastr.error("fetch trip in students done failed!!")
          reject()
        }
      })
    })
  }
}
