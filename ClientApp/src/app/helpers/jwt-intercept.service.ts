import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptService implements HttpInterceptor {

  constructor(private storage: StorageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwt = this.storage.getJWT();
    if (jwt) {
      request = request.clone({
        setHeaders: { 
            Authorization: `Bearer ${jwt}`
        }
      });
    }

    return next.handle(request);
  }
}
