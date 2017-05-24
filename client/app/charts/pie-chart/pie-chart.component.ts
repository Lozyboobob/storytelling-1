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
    private curtain: any; //for animation

    constructor() { }

  ngOnInit() {
  }
  init() {
    const element = this.chartContainer.nativeElement;
      this.width = element.offsetWidth;
      this.height = element.offsetHeight;
      const svg = d3.select(element).append('svg')
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
        this.data = [
        {
            label: 'data1',
            value: 1,
        },
        {
            label: 'data2',
            value: 2,
        },
        {
            label: 'data3',
            value: 3,
        },
        {
            label: 'data4',
            value: 4,
        }];
    };
    load() {
        const  outerRadius = this.radius - 10;
        const  arc = d3.arc()
            .innerRadius(0)
            .outerRadius(outerRadius);
        const pieColor = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
        d3.selectAll('path')
            .attr('fill', (datum, index) => {
                return pieColor(this.data[index].label);
            })
            .transition()
            .duration(2000)
            .attrTween('d', tweenPie);

        function tweenPie(b) {
            b.innerRadius = 0;
            const i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
            return function(t) { return arc(i(t)); };
        }


        d3.selectAll('text')
            .transition()
            .duration(2000)
            .attr('transform', (datum: any) => {
             datum.innerRadius = this.radius - 40;
                datum.outerRadius = this.radius - 40;
                return 'translate(' + arc.centroid(datum) + ')';
            })
            .text((datum, index) => this.data[index].label)
            .style('text-anchor', 'middle');

    }
    ease(){};
}
