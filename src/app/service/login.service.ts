import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { ToastrService } from 'ngx-toastr';
import { resolveObjectKey } from 'chart.js/dist/helpers/helpers.core';
import { BehaviorSubject, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  isUnique: any = false
  async IsEmailUsed(email: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.get("https://localhost:44338/api/login/IsEmailUsed/" + email).subscribe({
        next: (flag) => {
          this.isUnique = flag
          resolve()
        },
        error: () => {
          console.log('error check email')
          reject()
        }
      })
    })
  }

  async UpdateLoginData(login: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.put("https://localhost:44338/api/login/UpdateLogin", login).subscribe({
        next: () => {
          //this.toastr.success("password Updated successfully")
          resolve()
        },
        error: () => {
          //this.toastr.error("password update failed")
          reject()
        }
      })
    })
  }

  async CreateLogin(object: any) {
    return await new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44338/api/login/CreateLogin", object).subscribe({
        next: () => {
          console.log('login created for last user created')
          //this.toastr.success('login created successfully')
          resolve()
        },
        error: () => {
          console.log('LOGIN ERROR!!!')
          reject()
          //this.toastr.error('login creation failed')
        }
      })
    })
  }

  userLogged = new BehaviorSubject<any>('')


  async VerifyingLogin(Login: any) {
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const options = {
      headers: new HttpHeaders(header)
    }
    return await new Promise<void>((resolve, reject) => {
      this.http.post("https://localhost:44338/api/login/verifyinglogin", Login, options).subscribe({  
      next: (res: any) => {
          if(res==null)
          {
            resolve()
            return
          }
            let data: any = jwt_decode(res)
          console.log(data)
          localStorage.setItem('token', res)
          this.userLogged.next(data)

          localStorage.setItem('user', JSON.stringify(data))
          console.log(localStorage.getItem('user'))
          switch (data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
            case "1": this.router.navigate(['Admin']); break
            case "2": this.router.navigate(['Teacher']); break
            case "3": this.router.navigate(['Driver']); break
            case "4": this.router.navigate(['Parent']); break
          }
          resolve()
        },
        error: () => {
          //this.toastr.error('Email or password is wrong')
          reject()
        }
      })
    })
  }
}
