import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";

import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthenticaionInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token')
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
        debugger
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.log('login error')
                    return next.handle(req); 
                }
                return throwError(error);
            })
        );
    }
}
