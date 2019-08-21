import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  getUser() {
    const jwt = this.storage.getJWT();
    console.log(jwt);
    const params = { token: jwt };
    return this.http.post<any>(environment.apiUrl + '/user/byJWT', params) as Observable<any>;
  }
}
