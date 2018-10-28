import { Component, OnInit } from '@angular/core';
import { ComplexityService } from './complexity.service';
import { getStackedBarGraphData } from './common.operators';



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
  constructor(private complexityService: ComplexityService ) { }

  complexityOverTimeData = [];
  complexityOverDayData = [];
  complexityOverDayDataLoaded = false;

  ngOnInit() {
    // complexity: date.complexity.value,
    // complexityDensity: date.complexityDensity.value,
    // difficulty: date.difficulty.value,
    // effort: date.effort.value
    this.complexityService.getComplexityPerUserOverTime().subscribe(d => {
      const temp =  getStackedBarGraphData(d, 'user');
      this.complexityOverTimeData = temp.slice(temp.length - 30, temp.length);
    });

    this.complexityService.getComplexityByDay().subscribe(d => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for (const day of d.aggregations.dayOfWeek.buckets) {
        const infoOverDay = {key: day.key - 1, value: day.complexityDensity.value};
        this.complexityOverDayData.push(infoOverDay);
      }
      this.complexityOverDayData.sort((a, b) => +a.key - +b.key);
      this.complexityOverDayData.forEach(data => data.key = days[data.key]);
      this.complexityOverDayDataLoaded = true;
    });

    this.complexityService.getComplexCommits().subscribe(d => console.log(d));
  }
}
