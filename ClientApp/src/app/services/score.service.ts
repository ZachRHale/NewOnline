import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from '../models/score.model';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient, public storage: StorageService) { }


  getScore(id: string): Observable<Score> {
    return this.http.get(environment.apiUrl + '/score/' + id) as Observable<Score>;
  }

  updateScore(newScore: Score): Observable<any> {
    return this.http.post(environment.apiUrl + '/score', newScore);
  }

  getScoresByUser() {
    this.http.get(environment.apiUrl + '/score/byUser').subscribe(result => {
      console.log(result);
    })
  }
}
