import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       let currentToken = localStorage.getItem('token');
       if(currentToken == null ){
           return next.handle(req);
       }else if (currentToken){
           let request = req.clone(
        {
            setHeaders: {
                Auth: currentToken
            } 
        });
        return next.handle(request);
       }
    }
}