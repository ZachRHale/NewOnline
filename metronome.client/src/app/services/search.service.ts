import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private url: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  search(term: string) {
    return this.http.get<Score[]>(
      `${this.url}/api/search?term=${encodeURIComponent(term)}`,
    );
  }
}
