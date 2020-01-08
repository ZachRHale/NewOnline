import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Composer } from '../models/composer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComposerService {

  constructor(private http: HttpClient) { }

  getAllComposers(): Observable<Array<Composer>> {
    return this.http.get(environment.apiUrl + '/composer') as Observable<Array<Composer>>;
  }
}
