import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Measure } from '../models/measure.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  constructor(private http: HttpClient) {}

  public saveMeasures(measures: Array<Measure>) {
    const params = new HttpParams();
    params.set('measures', JSON.stringify(measures));
    return this.http.post(environment.apiUrl + '/measure', params);
  }

  public getMeasures(score: string): Observable<Array<Measure>> {
    return this.http.get(environment.apiUrl + '/measure/' + score) as Observable<Array<Measure>>
  }
}
