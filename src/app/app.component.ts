import { Component, OnInit } from '@angular/core';
import { ComplexityService } from './complexity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ui';
  constructor(private complexityService: ComplexityService ) { }

  ngOnInit() {
    this.complexityService.getComplexityPerUserOverTime().subscribe(d => console.log(d));
  }
}
