import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private toastr:ToastrService) { }
  uploadedImage: any=''
  createdUserId: any

  async CreateUser(user: any) {
    
    if (this.uploadedImage.image != "" && this.uploadedImage.image != null && this.uploadedImage.image != undefined)
      user.image = this.uploadedImage.image
    return await new Promise<void>((resolve,reject)=>{
      this.http.post("https://localhost:44338/api/user/CreateUser", user).subscribe({
        next: (res) => {
          this.createdUserId = res
          resolve()
        },
        error: () => {
          console.log('user creation failed')
          reject()
        }
      })
    })
  }

  loggedUser:any
  async GetUserById(userid:number){
    return await new Promise<void>((resolve,reject)=>{
      this.http.get("https://localhost:44338/api/user/GetUserById/"+userid).subscribe({
        next:(res)=>{
          this.loggedUser=res
          //this.toastr.success('user fetched successfully')
          resolve()
        },
        error:()=>{
          //this.toastr.error('user failed')
          reject()
        }
      })
    })
  }


  async UpdateUser(updated:any){
    if (this.uploadedImage.image != "" && this.uploadedImage.image != null && this.uploadedImage.image != undefined)
      updated.image = this.uploadedImage.image
    return await new Promise<void>((resolve,reject)=>{
      this.http.put("https://localhost:44338/api/user/UpdateUser",updated).subscribe({
        next:()=>{
          //this.toastr.success("Profile Updated")
          resolve()
        },
        error:()=>{
          //this.toastr.error("Profile update failed")
          reject()
        }
      })
    })
  }

  async UplaodUserImage(img: any) {
    return await new Promise<void>((resolve,reject)=>{
      this.http.post("https://localhost:44338/api/user/UploadUserImage", img).subscribe({
        next: (res) => {
          this.uploadedImage = res
          resolve()
        },
        error: () => {
          console.log('upload user image failed')
          reject()
        }
      })
    })
  }

  async DeleteUser(id:number){
    return await new Promise<void>((resolve,reject)=>{
      this.http.delete("https://localhost:44338/api/user/DeleteUser/"+id).subscribe({
        next:()=>{
          console.log('user delete, was a teacher')
          resolve()
        },
        error:()=>{
          console.log('del teacher failed!!')
          reject()
        }
      })
    })
  }
}
