import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { uuid } from '../common.operators';
import * as d3 from 'd3';
import { colors } from '../common.operators';

export interface PieChartData {
  key: string;
  value: number;
  percentage?: number;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {

  @Input() data: PieChartData[];
  @Input() width: number;
  @Input() height: number;
  @ViewChild('pieChart') pieChart: ElementRef;
  id = uuid();
  colorMap: { [key: string]: string } = {};
  keys: string[];

  constructor(
    private el: ElementRef
  ) { }

  ngOnChanges() {
    if (this.data) {
      let i = 0;
      for (const d of this.data) {
        this.colorMap[d.key] = colors[i];
        i++;
      }
      this.keys = this.data.map(t => t.key);
      this.draw();
    }
  }

  draw() {
    this.width = this.width || this.el.nativeElement.offsetWidth;
    this.height = this.height || this.el.nativeElement.offsetHeight;
    const radius = Math.min(this.width, this.height) / 2;
    const donutWidth = 60;

    const arc = d3.arc<PieChartData>()
      .outerRadius(radius)
      .innerRadius(radius - donutWidth);

    const pie = d3.pie<PieChartData>()
      .sort(null)
      .value((d) => d.value);

    this.pieChart.nativeElement.id = this.id;

    const svg = d3.select(`#${this.id}`).append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'fade-in')
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

    const g = svg.selectAll('.arc')
      .data(pie(this.data))
      .enter().append('g')
      .attr('class', 'arc')
      .text('hello');

    g.append('path')
      .attr('d', arc as any)
      .style('fill', (d, i) => this.colorMap[d.data.key]);
  }
}
