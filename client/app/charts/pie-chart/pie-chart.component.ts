import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import {Chart} from '../chart.interface';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, Chart {
 @ViewChild('chart') private chartContainer: ElementRef;
    private data: Array<any> = [];
    private width: number;
    private height: number;
    private radius: number;
    private _current: any; // for animation
    private pieColor = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    constructor() {

    }

  ngOnInit() {
  }
  init() {
      const element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
        const svg = d3.select(element)
          .append('svg')
          .append('g')
          .attr('transform', `translate(${this.width / 2},${this.height / 2})`);
    this.radius = Math.min(this.width, this.height) / 2;
    const values = this.data.map(data => data.value);
    const pie = d3.pie();
    const arcSelection = svg.selectAll('.arc')
        .data(pie(values))
        .enter()
        .append('g')
        .attr('class', 'arc');
    arcSelection.append('path');
    arcSelection.append('text');
    };
    setData(data) {
        this.data = data;
    };
    load() {
        const  outerRadius = this.radius - 10;
        const  arc = d3.arc()
            .innerRadius(0)
            .outerRadius(outerRadius);

        d3.selectAll('.arc').select('path')
            .attr('fill', (datum, index) => {
                return this.pieColor(this.data[index].label);
            })
            .transition()
            .duration(1500)
            .attrTween('d', tweenPie);

        d3.selectAll('.arc').select('text')
            .transition()
            .duration(1500)
            .attrTween('transform', tweenText)
            .text((datum, index) => this.data[index].label)
            .styleTween('text-anchor', d => {
                this._current = this._current || d;
                const interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    const d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? 'start' : 'end';
                };
            });

        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }
        function tweenText(b) {
            const i = d3.interpolate({startAngle: 0, endAngle:  0}, b);
            return function(t) { return 'translate(' + arc.centroid(i(t)) + ')rotate(' + angle(i(t)) + ')'; };
        }
        function tweenPie(b) {
            b.innerRadius = 0;
            const i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
            return function(t) { return arc(i(t)); };
        }

        function angle(d) {
            const a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
            return a > 90 ? a - 180 : a;
        }

    }
    ease() { };
}
