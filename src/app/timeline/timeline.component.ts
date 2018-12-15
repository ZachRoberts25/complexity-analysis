import { Component, OnInit, Input, OnChanges, ElementRef, HostListener, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { uuid } from '../common.operators';
import * as  Color from 'color';

const color = '#E3CFE5';
export const colors = [
  color,
  Color(color).darken(.1).toString(),
  Color(color).darken(.2).toString(),
  Color(color).darken(.3).toString(),
  Color(color).darken(.4).toString(),
  Color(color).darken(.5).toString(),
  Color(color).darken(.6).toString(),
  Color(color).darken(.7).toString(),
  Color(color).darken(.8).toString(),
  Color(color).darken(.9).toString()
];

export interface TimelineData {
  start: Date;
  end: Date;
  project: string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges, OnDestroy {

  @Input() data: TimelineData[];
  width: number;
  height: number;
  svg: d3.Selection<any, any, any, any>;
  colorMap = {};

  constructor(private el: ElementRef) { }

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


  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.data) {
      this.draw();
    }
  }

  draw() {
    if (this.svg) {
      this.svg.remove();
    }
    const margin = { top: 10, right: 20, bottom: 20, left: 100 };
    const elementWidth = this.width || this.el.nativeElement.offsetWidth;
    const elementHeight = (this.width || this.el.nativeElement.offsetHeight);
    const width = elementWidth - margin.left - margin.right;
    const height = elementHeight - margin.top - margin.bottom;

    let i = 0;
    for (const d of this.data) {
      if (this.colorMap[d.project]) {
        continue;
      }
      this.colorMap[d.project] = colors[i];
      i++;
    }

    this.el.nativeElement.id = uuid();

    this.svg = d3.select(`#${this.el.nativeElement.id}`)
      .append('svg')
      .attr('height', elementHeight)
      .attr('width', elementWidth);

    const g = this.svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('height', height)
      .attr('width', width);

    const x = d3.scaleTime()
      .rangeRound([0, width + margin.right])
      .domain([new Date(d3.min(this.data, (d) => d.start)), new Date(d3.max(this.data, (d) => d.end))]);

    const y = d3.scaleBand()
      .domain(this.data.map(d => d.project))
      .range([0, height]);

    const projectNumber = new Set(this.data.map(d => d.project));


    g
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    g
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    // Add spans
    g.selectAll('.chart-span')
      .data(this.data)
      .enter().append('rect')
      .classed('chart-span', true)
      .attr('x', (d) => {
        return x(new Date(d.start));
      })
      .attr('y', (d) => y(d.project))
      .attr('width', (d) => x(new Date(d.end)) - x(new Date(d.start)))
      .attr('height', Math.floor(height / projectNumber.size) - 5)
      .attr('fill', (d) => this.colorMap[d.project]);
  }
}
