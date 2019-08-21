import { Injectable } from '@angular/core';
import { Constants } from '../constants/global.const';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setJWT(jwt: string) {
    localStorage.setItem(Constants.localJWTKey, jwt);
  }

  getJWT(): string {
    return localStorage.getItem(Constants.localJWTKey);
  }
}
