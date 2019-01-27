import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { ProjectComplexityOverTimeComponent } from './project-complexity-over-time/project-complexity-over-time.component';
import { ProjectComplexityByPeriodComponent } from './project-complexity-by-period/project-complexity-by-period.component';
import { TopComplexityListComponent } from './top-complexity-list/top-complexity-list.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserTableComponent } from './user-table/user-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatButton, MatButtonModule, MatListModule, MatIconModule } from '@angular/material';
import { ComplexityService } from './service/complexity.service';
import { StackedBarGraphComponent } from './stacked-bar-graph/stacked-bar-graph.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComplexityOverTimeComponent,
    StackedBarGraphComponent,
    ProjectComplexityByPeriodComponent,
    TopComplexityListComponent,
    PieChartComponent,
    LineGraphComponent,
    UserTableComponent,
    TimelineComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    MatButtonModule,
    MatListModule,
    MatIconModule

  ],
  providers: [ComplexityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
