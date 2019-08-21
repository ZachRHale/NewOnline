import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerUser, RegisterReturn } from '../models/registerUser.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http: HttpClient) {}

  registerUser(params: registerUser) {
    return this.http.post<RegisterReturn>(environment.apiUrl + '/register', params) as Observable<RegisterReturn>;
  }
}
