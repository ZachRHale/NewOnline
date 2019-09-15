import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Measure, MeasureDatabaseModel, returnMeasureDBFromMeasure, singleMeasureToModel } from '../models/measure.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  constructor(private http: HttpClient, private storage: StorageService) {}

  public saveMeasures(measures: Array<Measure>)
  : Observable<Measure[]> {
    const dbModel: MeasureDatabaseModel[] = returnMeasureDBFromMeasure(measures);
    return this.http.post<Measure[]>(environment.apiUrl + '/measure', dbModel) as Observable<Array<Measure>>;
  }

  public saveSingleMeasure(measure: Measure): Observable<Measure> {
    const dbModel: MeasureDatabaseModel = singleMeasureToModel(measure);
    return this.http.post<Measure>(environment.apiUrl + '/measure/single', dbModel) as Observable<Measure>;
  }

  public getMeasures(score: string): Observable<Array<Measure>> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append("Authorization",`Bearer ${this.storage.getJWT()}` )
    return this.http.get(environment.apiUrl + '/measure/' + score) as Observable<Array<Measure>>
  }
}
