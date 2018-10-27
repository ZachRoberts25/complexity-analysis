import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'app-file-complexity-over-time',
  templateUrl: './file-complexity-over-time.component.html',
  styleUrls: ['./file-complexity-over-time.component.scss']
})
export class FileComplexityOverTimeComponent implements OnInit, OnChanges, OnDestroy {

  @Input() data: string;
  @Input() width: number;
  @Input() height: number;
  svg: d3.Selection<any, any, any, any>;

  constructor() { }

  ngOnInit() {
    // get access to data
    // may not be necessary if we just use onchanges
  }

  ngOnChanges() {
    if (this.data) {
      this.draw();
    }
  }

  ngOnDestroy() {
    if (this.svg) {
      this.svg.remove();
    }
  }

  formatDate(date: Date) {
    return moment(date).format('MM/DD/YYYY');
  }

  draw() {
    if (this.svg) {
      this.svg.remove();
    }
    const margin = { top: 10, right: 20, bottom: 20, left: 40 };
    const elementWidth = this.width * .85;
    const elementHeight = this.height;
    const width = elementWidth - margin.left - margin.right;
    const height = elementHeight - margin.top - margin.bottom;
  }

}
