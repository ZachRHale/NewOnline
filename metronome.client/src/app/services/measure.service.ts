import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Measure } from '../models/measures';

@Injectable({
  providedIn: 'root',
})
export class MeasureService {
  private url: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMeasuresForScore(scoreId: number) {
    return this.http.get<Measure[]>(this.url + `/api/score/${scoreId}/measures`);
  }
}
