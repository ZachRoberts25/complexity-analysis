import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { StackedBarGraphComponent } from './stacked-bar-graph/stacked-bar-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    StackedBarGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
