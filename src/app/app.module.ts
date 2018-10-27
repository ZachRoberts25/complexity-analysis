import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
<<<<<<< HEAD
import { TestComponent } from './test/test.component';
import { ProjectComplexityOverTimeComponent } from './project-complexity-over-time/project-complexity-over-time.component';
import { FileComplexityOverTimeComponent } from './file-complexity-over-time/file-complexity-over-time.component';
import { ProjectComplexityByPeriodComponent } from './project-complexity-by-period/project-complexity-by-period.component';
import { TopComplexityListComponent } from './top-complexity-list/top-complexity-list.component';
=======
import { StackedBarGraphComponent } from './stacked-bar-graph/stacked-bar-graph.component';
>>>>>>> a5e59f082521aa59be26ec4493b439f328c009bd

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    TestComponent,
    ProjectComplexityOverTimeComponent,
    FileComplexityOverTimeComponent,
    ProjectComplexityByPeriodComponent,
    TopComplexityListComponent
=======
    StackedBarGraphComponent
>>>>>>> a5e59f082521aa59be26ec4493b439f328c009bd
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
