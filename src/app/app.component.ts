import { Component, OnInit } from '@angular/core';
import { ComplexityService } from './service/complexity.service';
import { getStackedBarGraphData, getLineGraphData } from './common.operators';
import * as d3 from 'd3';

export interface ComplexityData {
  complexity: number;
  complexityDensity: number;
  difficulty: number;
  effort: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ui';
  constructor(private complexityService: ComplexityService) { }

  complexityOverTimeData = [];
  complexityRefactorOverTimeData = [];
  complexityOverDayData = [];
  complexityOverDayDataLoaded = false;
  deltaComplexityOverTime = [];
  timelineData = [];
  complexCommits = [];
  highLevelStats = {};
  Object = Object;
  start: Date;
  end: Date;
  ngOnInit() {
    this.complexityService.getComplexityPerUserOverTime(false).subscribe(d => {
      this.complexityOverTimeData = d;
      // const temp = getStackedBarGraphData(d, 'framework', 'linesOfCode');
      // this.complexityOverTimeData = temp.slice(2, temp.length);
    });

    this.complexityService.getComplexityPerUserOverTime(true).subscribe(d => {
      // const temp = getStackedBarGraphData(d, 'framework', 'linesOfCode');
      // this.complexityRefactorOverTimeData = temp.slice(2, temp.length);
      this.complexityRefactorOverTimeData = d;
    });

    this.complexityService.getStartEndByProject().subscribe((data) => {
      this.timelineData = data;
      this.getStartEndDate();
      this.complexityService.getHighLevelStats().subscribe((stats) => {
        this.highLevelStats = { startDate: this.start, endDate: this.end, ...stats };
      });
    });

  }

  camelToTitle(str: string) {
    return str.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2');
  }

  getStartEndDate() {
    [this.start, this.end] = [new Date(d3.min(this.timelineData, (d) => d.start)), new Date(d3.max(this.timelineData, (d) => d.end))]
  }
}
