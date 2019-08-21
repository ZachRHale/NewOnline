import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.mode';
import { Observable } from 'rxjs';
import { registerUser, RegisterReturn } from '../models/registerUser.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(user: User) {
    return this.http.post(environment.apiUrl + '/signin', user) as Observable<RegisterReturn>;
  }
}
