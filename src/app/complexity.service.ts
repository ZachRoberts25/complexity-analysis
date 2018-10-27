import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = '/api/';

@Injectable({
  providedIn: 'root'
})
export class ComplexityService {

  constructor(private http: HttpClient) { }

  getComplexityPerUserOverTime() {
    return this.http.get<any>(BASE_URL + 'commit');
  }
}
