import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = '/api/';

@Injectable({
  providedIn: 'root'
})
export class ComplexityService {

  constructor(private http: HttpClient) { }

  getComplexityPerUserOverTime() {
    return this.http.get<any>(BASE_URL + 'user/framework-by-date');
  }

  getComplexityByDay() {
    return this.http.get<any>(BASE_URL + 'commit/timeOfDay');
  }

  getComplexCommits() {
    return this.http.get<any>(BASE_URL + 'commit/complexCommits');
  }

  getDeltaComplexityOverTime() {
    return this.http.get<any>(BASE_URL + 'commit/deltaComplexityOverTime');
  }
}
