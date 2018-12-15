import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ComplexityService } from '../service/complexity.service';

export class UserTableDataSource extends DataSource<any> {

  constructor(private service: ComplexityService) {
    super();
  }

  connect(): Observable<any[]> {
    return this.service.getComplexCommits();
  }

  disconnect() { }
}
