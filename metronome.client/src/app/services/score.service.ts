import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private url: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getScore(scoreId: number) {
    return this.http.get<Score>(this.url + `/api/score/${scoreId}`);
  }
}
