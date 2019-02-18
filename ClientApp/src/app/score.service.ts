import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from './models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }


  getScore(id: string): Observable<Score> {
    return this.http.get('https://localhost:5001/api/score/' + id) as Observable<Score>;
  }
}
