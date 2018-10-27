import { Component, OnInit } from '@angular/core';
import { ComplexityService } from './complexity.service';


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
    this.complexityService.getComplexityPerUserOverTime().subscribe(d => {
      for (const bucket of (d.aggregations.user.buckets as any[])) {
        // this.complexityOverTimeData[bucket.key] = {};
        for (const date of bucket.date.buckets as any[]) {
          // const complexityData = {
            // complexity: date.complexity.value,
            // complexityDensity: date.complexityDensity.value,
            // difficulty: date.difficulty.value,
            // effort: date.effort.value
          // };
          const data = {};
          data[bucket.key] = date.complexityDensity.value;
          this.complexityOverTimeData.push({
            date: date.key,
            data
          });
        }
      }

      console.log(this.complexityOverTimeData);
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
  }
}
