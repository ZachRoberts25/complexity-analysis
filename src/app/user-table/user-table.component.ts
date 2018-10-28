import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserTableDataSource } from './user-table-datasource';
import { ComplexityService } from 'src/app/complexity.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['authorName', 'hashKey', 'message', 'date', 'complexity'];

  constructor(private service: ComplexityService) {}


  ngOnInit() {
    this.dataSource = new UserTableDataSource(this.service);
  }
}
