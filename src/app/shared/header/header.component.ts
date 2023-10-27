import { Component } from '@angular/core';
import { ContentService } from 'src/app/service/content.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public contentService: ContentService, private router: Router, private loginService: LoginService) { }
  username: any
  userrole:any
  async ngOnInit() {
    this.contentService.GetAllContent()
    this.loginService.userLogged.subscribe((log: any) => {
      this.username = log['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      console.log('GGGGG : ' + log['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
    })
    if (this.username == undefined) {
      const token = localStorage.getItem('token')
      if (token) {
        let userInfo: any = jwt_decode(token)
        this.username = userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        this.userrole=userInfo['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      }
    }
  }

  Dashboard(){
    const token = localStorage.getItem('token')
    if (token) {
      let userInfo: any = jwt_decode(token)
      this.username = userInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      this.userrole=userInfo['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    }


    switch(this.userrole){
      case "1": this.router.navigate(['Admin']);break
      case "2": this.router.navigate(['Teacher']); break
      case "3": this.router.navigate(['Driver']); break
      case "4": this.router.navigate(['Parent']); break
    }
  }

  LogOut() {
    localStorage.clear()
    this.username = undefined
    this.router.navigate(['Home/Login'])
  }
}
