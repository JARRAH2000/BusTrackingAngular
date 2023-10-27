import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import { resolve } from 'chart.js/dist/helpers/helpers.options';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  AllContacts:any=[]
  Contact:any=''
  async GetAllContacts()
  {
    return await new Promise<void>((resolve,reject)=>{
      this.http.get("https://localhost:44338/api/Contact/GetAllContacts").subscribe({
        next:(res)=>{
          this.AllContacts=res
          this.Contact=this.AllContacts[0]
          resolve()
        },
        error:()=>{
          console.log('messages error')
          reject()
        }

      })
    }) 
  }


  async GetContactById(id:number)
  {
    return await new Promise<void>((resolve,reject)=>{
      this.http.get("https://localhost:44338/api/Contact/GetContactById/"+id).subscribe({
        next:(res)=>{
          this.Contact=res
          resolve()
        },
        error:()=>{
          console.log('messages error')
          reject()
        }

      })
    }) 
  }

 

  async DeleteContact(id:number)
  {
    return await new Promise<void>((resolve,reject)=>{
      this.http.delete("https://localhost:44338/api/Contact/DeleteContact/"+id).subscribe({
        next:()=>{
          //but a toastr here
          this.Contact={}
          resolve()
        },
        error:()=>{
          console.log('messages error')
          reject()
        }

      })
    }) 
  }
}
