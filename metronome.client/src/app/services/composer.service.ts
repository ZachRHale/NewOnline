import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Composer } from '../models/composer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComposerService {
  private url: string = "https://localhost:7270";
  constructor(private http: HttpClient) {}

  getComposers() {
    return this.http.get<Composer[]>(this.url + '/api/composer');
  }

  updateComposer(composer: Composer): Observable<Composer> {
    return this.http.put<Composer>(this.url + '/api/composer/' + composer.id, composer);
  }

  createComposer(composer: Composer): Observable<Composer> {
    return this.http.post<Composer>(this.url + '/api/composer', composer);
  }
}
