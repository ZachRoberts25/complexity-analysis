import { Component, OnInit, Input, OnChanges,
  ViewEncapsulation, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';
import { uuid, colors } from '../common.operators';

export interface StackedBarGraphData {
  date: Date;
  data: {
    [key: string]: number;
  };
}

@Component({
  selector: 'app-file-complexity-over-time',
  templateUrl: './file-complexity-over-time.component.html',
  styleUrls: ['./file-complexity-over-time.component.scss']
})
export class FileComplexityOverTimeComponent implements OnInit, OnChanges, OnDestroy {

  @Input() data: StackedBarGraphData[];
  @Input() width: number;
  @Input() height: number;
  @Output() colorMapChanges = new EventEmitter<{ [key: string]: string }>();
  colors = colors;
  colorMap: { [key: string]: string } = {};
  @ViewChild('barGraph') graphElement: ElementRef;
  keys: string[];
  svg: d3.Selection<any, any, any, any>;
  id = uuid();

  constructor() { }

  ngOnInit() {
    if (this.data) {
      this.draw();
    }
    console.log('hi');
  }

  ngOnChanges() {
    if (this.data) {
      this.draw();
    }
    console.log('hi');
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

    this.graphElement.nativeElement.id = uuid();

    this.svg = d3.select(`#${this.graphElement.nativeElement.id}`)
      .append('svg')
      .attr('height', elementHeight)
      .attr('width', elementWidth)
      .attr('class', 'fade-in');

    const g = this.svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('height', height)
      .attr('width', width);

    const keys: string[] | Set<string> = new Set();
    const stackData: { [key: string]: number }[] = [];
    const dates = new Set();
    for (const a of this.data) {
      dates.add(a.date);
      stackData.push({ ...a.data, date: a.date as any as number });
      for (const key of Object.keys(a.data)) {
        keys.add(key);
      }
    }

    this.keys = Array.from(keys);
    // add 0 for any key we have that isn't in stackData;
    for (const a of stackData) {
      for (const key of this.keys) {
        if (!a[key]) {
          a[key] = 0;
        }
      }
    }

    const layers = d3.stack()
      .keys(this.keys)(stackData);

    const x = d3.scaleTime()
      .rangeRound([0, width])
      .domain(d3.extent(this.data, (d) => d.date));

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(this.data, (d) => calcTotal(d.data))]).nice();

    const z = d3.scaleOrdinal()
      .range(this.colors)
      .domain(this.keys);

    function calcTotal(o: { [key: string]: number }) {
      let total = 0;
      for (const key of Object.keys(o)) {
        total += o[key];
      }
      return Math.trunc(total);
    }

    g.selectAll('.serie')
      .data(layers)
      .enter()
      .append('g')
      .attr('class', 'serie')
      .attr('fill', (d) => {
        this.colorMap[d.key] = z(d.key) as string;
        return z(d.key) as any;
      })
      // .attr('opacity', .6)
      .selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.data.date as any))
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', Math.floor(width / Math.abs(moment(x.domain()[0]).diff(moment(x.domain()[1]), 'days'))));

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .attr('class', 'axis')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y))
      ;
  }

}
