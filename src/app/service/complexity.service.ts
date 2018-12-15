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
    if (!refactor) {
      // tslint:disable-next-line:max-line-length
      return of(this.convertDates([{ 'date': '2017-01-01T00:00:00.000Z', 'data': { 'travetto': 578 } }, { 'date': '2017-02-01T00:00:00.000Z', 'data': { 'travetto': 63, 'angularjs': 2 } }, { 'date': '2017-03-01T00:00:00.000Z', 'data': { 'travetto': 445, 'angularjs': 1050 } }, { 'date': '2017-04-01T00:00:00.000Z', 'data': { 'travetto': 365, 'angularjs': 91 } }, { 'date': '2017-05-01T00:00:00.000Z', 'data': { 'travetto': 328, 'angularjs': 0 } }, { 'date': '2017-06-01T00:00:00.000Z', 'data': { 'travetto': 20, 'angularjs': 78 } }, { 'date': '2017-07-01T00:00:00.000Z', 'data': { 'travetto': 135, 'angularjs': 11 } }, { 'date': '2017-08-01T00:00:00.000Z', 'data': { 'travetto': 441, 'angularjs': 0, 'angular': 538 } }, { 'date': '2017-09-01T00:00:00.000Z', 'data': { 'travetto': 180, 'angularjs': 0, 'angular': 181 } }, { 'date': '2017-10-01T00:00:00.000Z', 'data': { 'travetto': 0, 'angularjs': -1, 'angular': 1 } }, { 'date': '2017-11-01T00:00:00.000Z', 'data': { 'travetto': 0, 'angularjs': 377, 'angular': 0 } }, { 'date': '2017-12-01T00:00:00.000Z', 'data': { 'travetto': 0, 'angularjs': 257, 'angular': 0 } }, { 'date': '2018-01-01T00:00:00.000Z', 'data': { 'travetto': 0, 'angularjs': 1208, 'angular': 0 } }, { 'date': '2018-02-01T00:00:00.000Z', 'data': { 'travetto': 0, 'angularjs': 513, 'angular': 409 } }, { 'date': '2018-03-01T00:00:00.000Z', 'data': { 'travetto': 0, 'angularjs': 145, 'angular': 0 } }, { 'date': '2018-04-01T00:00:00.000Z', 'data': { 'travetto': 0, 'angularjs': 505, 'angular': 2 } }, { 'date': '2018-05-01T00:00:00.000Z', 'data': { 'travetto': 0, 'angularjs': 101, 'angular': 152 } }, { 'date': '2018-06-01T00:00:00.000Z', 'data': { 'travetto': 0, 'angularjs': 338, 'angular': 95 } }, { 'date': '2018-07-01T00:00:00.000Z', 'data': { 'travetto': 223, 'angularjs': 59, 'angular': 415 } }, { 'date': '2018-08-01T00:00:00.000Z', 'data': { 'travetto': 1, 'angularjs': 265, 'angular': 825 } }, { 'date': '2018-09-01T00:00:00.000Z', 'data': { 'travetto': 530, 'angularjs': 0, 'angular': 91 } }, { 'date': '2018-10-01T00:00:00.000Z', 'data': { 'travetto': 81, 'angularjs': 0, 'angular': 421 } }, { 'date': '2018-11-01T00:00:00.000Z', 'data': { 'travetto': 481, 'angularjs': 0, 'angular': 42 } }, { 'date': '2018-12-01T00:00:00.000Z', 'data': { 'travetto': 414, 'angularjs': 73 } }]));
    } else {
      // tslint:disable-next-line:max-line-length
      return of(this.convertDates([{ "date": "2017-01-01T00:00:00.000Z", "data": { "travetto": -358 } }, { "date": "2017-02-01T00:00:00.000Z", "data": { "travetto": -13, "angularjs": -5 } }, { "date": "2017-03-01T00:00:00.000Z", "data": { "travetto": -118, "angularjs": -904 } }, { "date": "2017-04-01T00:00:00.000Z", "data": { "travetto": -469, "angularjs": -11 } }, { "date": "2017-05-01T00:00:00.000Z", "data": { "travetto": -134, "angularjs": 0 } }, { "date": "2017-06-01T00:00:00.000Z", "data": { "travetto": 0, "angularjs": -11 } }, { "date": "2017-07-01T00:00:00.000Z", "data": { "travetto": -8, "angularjs": -4 } }, { "date": "2017-08-01T00:00:00.000Z", "data": { "travetto": -65, "angularjs": -3, "angular": -367 } }, { "date": "2017-09-01T00:00:00.000Z", "data": { "travetto": -19, "angularjs": 0, "angular": -41 } }, { "date": "2017-10-01T00:00:00.000Z", "data": { "travetto": 0, "angularjs": 0, "angular": 0 } }, { "date": "2017-11-01T00:00:00.000Z", "data": { "travetto": 0, "angularjs": -23, "angular": 0 } }, { "date": "2017-12-01T00:00:00.000Z", "data": { "travetto": 0, "angularjs": -114, "angular": 0 } }, { "date": "2018-01-01T00:00:00.000Z", "data": { "travetto": 0, "angularjs": -1050, "angular": 0 } }, { "date": "2018-02-01T00:00:00.000Z", "data": { "travetto": 0, "angularjs": -588, "angular": -29 } }, { "date": "2018-03-01T00:00:00.000Z", "data": { "travetto": 0, "angularjs": -123, "angular": 0 } }, { "date": "2018-04-01T00:00:00.000Z", "data": { "travetto": 0, "angularjs": -61, "angular": 0 } }, { "date": "2018-05-01T00:00:00.000Z", "data": { "travetto": 0, "angularjs": -30, "angular": -9 } }, { "date": "2018-06-01T00:00:00.000Z", "data": { "travetto": 0, "angularjs": -44, "angular": -7 } }, { "date": "2018-07-01T00:00:00.000Z", "data": { "travetto": -67, "angularjs": -1, "angular": -66 } }, { "date": "2018-08-01T00:00:00.000Z", "data": { "travetto": -143, "angularjs": -47, "angular": -385 } }, { "date": "2018-09-01T00:00:00.000Z", "data": { "travetto": -485, "angularjs": 0, "angular": -212 } }, { "date": "2018-10-01T00:00:00.000Z", "data": { "travetto": -2, "angularjs": 0, "angular": -245 } }, { "date": "2018-11-01T00:00:00.000Z", "data": { "travetto": -80, "angularjs": 0, "angular": 0 } }, { "date": "2018-12-01T00:00:00.000Z", "data": { "travetto": -583, "angularjs": -16 } }]))
    }
  }

  getStartEndByProject() {
    // tslint:disable-next-line:max-line-length
    return of(this.convertDates([{ "project": "intelgraph", "start": "2017-02-28T21:38:40.000Z", "end": "2018-08-29T17:57:46.000Z" }, { "project": "hirepower", "start": "2016-11-14T20:35:30.000Z", "end": "2017-09-22T21:38:52.000Z" }, { "project": "aaa-ui", "start": "2017-08-01T21:42:32.000Z", "end": "2018-08-08T14:53:36.000Z" }, { "project": "mu-ui", "start": "2018-07-31T14:59:06.000Z", "end": "2018-10-12T14:15:00.000Z" }, { "project": "engage-rest", "start": "2018-11-01T14:31:02.000Z", "end": "2018-12-07T16:43:54.000Z" }, { "project": "engage-ui", "start": "2018-10-02T13:20:15.000Z", "end": "2018-11-02T14:30:48.000Z" }, { "project": "reward-found-ui", "start": "2018-06-27T18:57:34.000Z", "end": "2018-11-03T16:04:16.000Z" }, { "project": "project-mayhem-ui", "start": "2018-02-10T21:36:35.000Z", "end": "2018-04-09T18:57:28.000Z" }, { "project": "reward-found-rest", "start": "2018-05-18T18:54:52.000Z", "end": "2018-10-01T16:10:43.000Z" }, { "project": "mu-ingestor", "start": "2018-09-05T12:02:11.000Z", "end": "2018-10-08T15:25:46.000Z" }, { "project": "mu-rest", "start": "2018-08-08T19:52:31.000Z", "end": "2018-10-12T14:14:34.000Z" }]))
    // return this.http.get<TimelineData[]>(BASE_URL + 'user/start-end-by-project');
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
    // tslint:disable-next-line:max-line-length
    return of({ "logicalLines": 16075, "logicalLinesRefactored": 8509, "physicalLines": 22995, "physicalLinesRefactored": 12791, "timeSpent": 755, "timeSpentRefactoring": 445, "projects": 11 });
  }

  convertDates(arr: any[]) {
    for (const a of arr) {
      a.date = new Date(a.date) as any;
    }
    return arr;
  }
}
