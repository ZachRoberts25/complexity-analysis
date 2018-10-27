import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { ProjectComplexityOverTimeComponent } from './project-complexity-over-time/project-complexity-over-time.component';
import { FileComplexityOverTimeComponent } from './file-complexity-over-time/file-complexity-over-time.component';
import { ProjectComplexityByPeriodComponent } from './project-complexity-by-period/project-complexity-by-period.component';
import { TopComplexityListComponent } from './top-complexity-list/top-complexity-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ProjectComplexityOverTimeComponent,
    FileComplexityOverTimeComponent,
    ProjectComplexityByPeriodComponent,
    TopComplexityListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
