import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }
  createdParentId: any
  parent: any
  allParents: any = []

  loggedParent: any

  children: any = []
  async CreateParent(object: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44338/api/parent/CreateParent", object).subscribe({
        next: (res) => {
          this.createdParentId = res
          resolve()
        },
        error: () => {
          console.log('parent creation failed!!')
          reject()
        }
      })
    })
  }


  async GetAllParents() {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/parent/GetAllParents").subscribe({
        next: (res) => {
          this.allParents = res
          console.log('fetch all parents done!!')
          resolve()
        },
        error: () => {
          console.log('fetch all parents failed!!')
          reject()
        }
      })
    })
  }

  async GetParentWithStudentsById(id: number) {
    return await new Promise<void>((resolve, reject) => {
      //debugger
      this.http.get("https://localhost:44338/api/parent/GetParentAndStudentsById/" + id).subscribe({
        next: (res: any) => {
          debugger
          if (res != null)
            this.parent = res
          this.parent.students = this.parent.students.filter((student: any) => student != null)
          //this.children=this.children.filter((s:any)=>s!=null)
          console.log('fetch parent done')
          resolve()
        },
        error: () => {
          console.log('fetch parent failed!!')
          reject()
        }
      })
    })
  }


  async GetParentByUserId(userid: number) {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/parent/GetParentByUserId/" + userid).subscribe({
        next: (res) => {
          this.loggedParent = res
          /*this.toastr.success("parent fetched successfully")*/
          resolve()
        },
        error: () => {
          /*this.toastr.error("parent failed!!")*/
          reject()
        }
      })
    })
  }
}
