import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }
  roles:any=[]
   GetAllRoles()
  {
     this.http.get("https://localhost:44338/api/role/GetAllRoles").subscribe({
      next:(res)=>{
        this.roles=res
        console.log('fetch roles success!')
      },
      error:()=>{
        console.log('fetch roles failed!')
      },
      complete:()=>{
        console.log('roles done!')
      }
    })
  }
}
