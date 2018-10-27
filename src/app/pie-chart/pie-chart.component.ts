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
  @Input() width = 500;
  @Input() height = 500;
  @ViewChild('pieChart') pieChart: ElementRef;
  id = uuid();

  constructor(
    private el: ElementRef
  ) { }

  ngOnChanges() {
    if (this.data) {
      this.draw();
    }
  }

  draw() {
    const width = this.width || this.el.nativeElement.offsetWidth;
    const height = this.height || this.el.nativeElement.offsetHeight;
    const radius = Math.min(width, height) / 2;

    console.log(width, height, radius);
    console.log('datas', this.data);

    const arc = d3.arc<PieChartData>()
      .outerRadius(0)
      .innerRadius(radius);

    const pie = d3.pie<PieChartData>()
      .sort(null)
      .value((d) => d.value);

    this.pieChart.nativeElement.id = this.id;

    const svg = d3.select(`#${this.id}`).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'fade-in')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const g = svg.selectAll('.arc')
      .data(pie(this.data))
      .enter().append('g')
      .attr('class', 'arc')
      .text('hello');

    g.append('path')
      .attr('d', arc as any)
      .style('fill', (d, i) => colors[i])
      .attr('opacity', .6);

    const total = this.getTotal();

    g.append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d as any)})`)
      .text((d) => `${d.data.key} ${Math.trunc((d.data.value / total) * 100)}%`)
      .attr('fill', '#FF')
      .attr('dx', '-1em')
      // .style('white-space', 'nowrap')
      .style('font-size', '12px')
      .style('overflow', 'visible');
  }

  getTotal() {
    let total = 0;
    for (const d of this.data) {
      total += d.value;
    }
    return total;
  }

}
