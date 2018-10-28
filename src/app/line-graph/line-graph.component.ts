import { Component, OnInit, Input, OnChanges, ElementRef, ViewEncapsulation, OnDestroy, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { uuid } from '../common.operators';

export interface LineGraphData {
  date: Date;
  count: number;
}

export interface MarginOptions {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineGraphComponent implements OnChanges, OnDestroy {
  @Input() data: LineGraphData[];
  @Input() width = 500;
  @Input() height = 500;
  @Input() margin: MarginOptions;
  @Input() color = '#C5C5C5';
  @Input() withArea: boolean;
  @Input() withGradient: boolean;
  @Input() withGrid = false;
  @Input() withAxis = true;
  @Input() ticks = 2;
  svg: d3.Selection<d3.BaseType, LineGraphData, HTMLElement, any>;

  id: string;
  gradientId: string;

  constructor(private el: ElementRef) {
    this.id = uuid();
    this.gradientId = `gradient-${uuid()}`;
  }

  ngOnChanges() {
    if (this.data) {
      if (this.svg) {
        this.svg.remove();
      }
      this.draw();
    }
  }

  ngOnDestroy() {
    if (this.svg) {
      this.svg.remove();
    }
  }

  draw() {
    const margin = this.margin || { top: 20, right: 40, bottom: 30, left: 40 };
    const width = (this.width || this.el.nativeElement.offsetWidth) - margin.left - margin.right;
    const height = (this.height || this.el.nativeElement.offsetHeight) - margin.top - margin.bottom;
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const line = d3.line<LineGraphData>()
      .curve(this.withGradient ? d3.curveBasis : d3.curveLinear)
      .x((d) => x(d.date))
      .y((d) => y(d.count));

    this.el.nativeElement.id = this.id;
    this.svg = d3.select<d3.BaseType, LineGraphData>(`#${this.id}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
      // .attr('class', this.fade ? 'fade-in' : '');

    const g = this.svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale the range of the data
    x.domain(d3.extent(this.data, (d) => d.date));
    y.domain([d3.min(this.data, (d) => d.count), d3.max(this.data, (d) => d.count)]);
    if (this.withGrid) {
      g.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x)
          .tickSize(-height)
          .tickFormat('' as any));

      g.append('g')
        .attr('class', `grid`)
        .call(d3.axisLeft(y)
          .tickSize(-width)
          .tickFormat('' as any));
    }

    g.append('path')
      .data([this.data])
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', this.color)
      .attr('stroke-width', '2px')
      .attr('shape-rendering', 'geometricPrecision')
      .attr('opacity', this.withArea ? .4 : 1);

    if (this.withArea) {
      const area = d3.area<LineGraphData>()
        .curve(d3.curveBasis)
        .x((d) => x(d.date))
        .y0(height)
        .y1((d) => y(d.count));

      // add the area
      g.append('path')
        .attr('class', 'area')
        .attr('d', area(this.data))
        .attr('fill', this.withGradient ? `url(#${this.gradientId})` : this.color)
        .attr('opacity', .4);
    }

    if (this.withGradient) {
      // set the gradient
      this.svg.append('linearGradient')
        .attr('id', this.gradientId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', y(d3.min(this.data, (d) => d.count)))
        .attr('x2', 0).attr('y2', y(d3.max(this.data, (d) => d.count)))
        .selectAll('stop')
        .data([{ offset: '0%', color: '#31343F' },
        { offset: '100%', color: this.color }])
        .enter().append('stop')
        .attr('offset', (d) => d.offset)
        .attr('stop-color', (d) => d.color);
    }

    if (this.withAxis) {
      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .attr('class', 'x-axis')
        .call(d3.axisBottom(x));

      g.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y)
          .ticks(2)
        );
    }

  }

}
