import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimelineData } from '../timeline/timeline.component';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

const BASE_URL = '/api/';

@Injectable({
  providedIn: 'root'
})
export class ComplexityService {

  constructor(private http: HttpClient) { }

  getComplexityPerUserOverTime(refactor: boolean) {
    return this.http.post<any>(BASE_URL + 'user/framework-by-date', { refactor });
  }

  getStartEndByProject() {
    return this.http.get<TimelineData[]>(BASE_URL + 'user/start-end-by-project');
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

  getHighLevelStats() {
    return this.http.get<TimelineData[]>(BASE_URL + 'user/high-level-stats');
  }
}
