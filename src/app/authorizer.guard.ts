import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthorizerGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const toekn=localStorage.getItem('token')
      if(toekn){

        let user:any=jwt_decode(toekn)
        if(state.url.includes('Admin')&&user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']==1){
          return true
        }
        else if(state.url.includes('Teacher')&&user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']==2){
          return true
        }
        else if(state.url.includes('Driver')&&user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']==3){
          return true;
        }
        else if(state.url.includes('Parent')&&user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']==4){
          return true
        }
      }
      return false
  }
  
}
