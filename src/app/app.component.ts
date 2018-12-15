import { Component, OnInit } from '@angular/core';
import { ComplexityService } from './service/complexity.service';
import { getStackedBarGraphData, getLineGraphData } from './common.operators';



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
  ngOnInit() {
    this.complexityService.getComplexityPerUserOverTime(false).subscribe(d => {
      const temp = getStackedBarGraphData(d, 'framework', 'linesOfCode');
      this.complexityOverTimeData = temp.slice(2, temp.length);
    });

    this.complexityService.getComplexityPerUserOverTime(true).subscribe(d => {
      const temp = getStackedBarGraphData(d, 'framework', 'linesOfCode');
      this.complexityRefactorOverTimeData = temp.slice(2, temp.length);
    });

    this.complexityService.getStartEndByProject().subscribe((data) => {
      this.timelineData = data;
    });
  }
}
