import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http:HttpClient,private toastr:ToastrService) { }

  async CreateAbsence(absentStudent:any){
    return await new Promise<void>((resolve,reject)=>{
      this.http.post("https://localhost:44338/api/Absence/CreateAbsence",absentStudent).subscribe({
      next:()=>{
        //this.toastr.success('absent saved successfully')
        resolve()
      },
      error:()=>{
        //this.toastr.error('absent saving failed')
        reject()
      }
      })
    })
  }
}
