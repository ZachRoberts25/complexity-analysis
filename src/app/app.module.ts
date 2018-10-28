import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ProjectComplexityOverTimeComponent } from './project-complexity-over-time/project-complexity-over-time.component';
import { FileComplexityOverTimeComponent } from './file-complexity-over-time/file-complexity-over-time.component';
import { ProjectComplexityByPeriodComponent } from './project-complexity-by-period/project-complexity-by-period.component';
import { TopComplexityListComponent } from './top-complexity-list/top-complexity-list.component';
import { StackedBarGraphComponent } from './stacked-bar-graph/stacked-bar-graph.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserTableComponent } from './user-table/user-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComplexityOverTimeComponent,
    FileComplexityOverTimeComponent,
    ProjectComplexityByPeriodComponent,
    TopComplexityListComponent,
    StackedBarGraphComponent,
    PieChartComponent,
    LineGraphComponent,
    UserTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
