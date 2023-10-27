import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { resolveObjectKey } from 'chart.js/dist/helpers/helpers.core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  content: any = [{}]
  logoimage: any
  async GetAllContent() {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/content/GetAllContents").subscribe({
        next: (res) => {
          this.content = res
          resolve()
        },
        error: () => {
          console.log('content error')
          reject()
        },
        complete: () => { console.log('content is ready') }
      })
    })

  }


  async UpdateContent(object: any) {

    if (this.logoimage != undefined && this.logoimage != null && this.logoimage != "")
      object.mainlogo = this.logoimage.mainlogo
    return await new Promise<void>((resolve,reject)=>{
      this.http.put("https://localhost:44338/api/content/UpdateContent", object).subscribe({
        next: () => {
          //this.toastr.success('content updated')
          resolve()
        },
        error: () => {
          //this.toastr.error('content failed')
          reject()
        },
        complete: () => { }
      });
    })
    
  }



  uploadAttachmentImage(image: any) {

    this.http.post('https://localhost:44338/api/content/UploadLogo', image).subscribe({
      next: (img) => {
        //debugger
        this.logoimage = img
      }
    })
  }

  ClickInfo(social: string) {
    switch (social) {
      case 'email': window.location.assign(`mailto:${this.content.email}`); break
      case 'youtube': window.location.href = this.content.youtube; break
      case 'facebook': window.location.href = this.content.facebook; break
      case 'telephone': window.location.href = `tel:${this.content.telephone}`; break
    }
  }
}
