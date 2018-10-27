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

  complexityOverTimeData = {};

  ngOnInit() {
    this.complexityService.getComplexityPerUserOverTime().subscribe(d => {
      console.log(d.aggregations.user.buckets);
      for (const bucket of (d.aggregations.user.buckets as any[])) {
        console.log(bucket.key);
        console.log(bucket);
        this.complexityOverTimeData[bucket.key] = {};
        for (const date of bucket.date.buckets as any[]) {
          // const complexityData = {
            // complexity: date.complexity.value,
            // complexityDensity: date.complexityDensity.value,
            // difficulty: date.difficulty.value,
            // effort: date.effort.value
          // };
          this.complexityOverTimeData[bucket.key][date.key] = date.complexityDensity.value;
        }
      }

      console.log(this.complexityOverTimeData);
    });
  }
}
