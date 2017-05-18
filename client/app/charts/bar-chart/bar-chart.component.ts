import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import {Chart} from '../chart.interface';
@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, Chart {

    @ViewChild('chart') private chartContainer: ElementRef;
    private data: Array<any> = sample;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;

    private loaded: boolean = true;
    constructor() { }

    ngOnInit() {
        this.data = [];
    }

    createChart() {
        let element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

        let svg = d3.select(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);

        // chart plot area
        this.chart = svg.append('g')
            .attr('class', 'bars')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        // define X & Y domains
        console.log("index-1",this.data);
        let xDomain = this.data.map(d => d.index);
        console.log("index-1");
        let yDomain = [0, d3.max(this.data, d => d.value)];

        // create scales
        this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

        // bar colors
        this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

        // x & y axis
        this.xAxis = svg.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));
        this.yAxis = svg.append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .call(d3.axisLeft(this.yScale));
    }

    updateChart() {
        // update scales & axis
        this.xScale.domain(this.data.map(d => d.index));
        this.yScale.domain([0, d3.max(this.data, d => d.value)]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(d3.axisBottom(this.xScale));
        this.yAxis.transition().call(d3.axisLeft(this.yScale));

        let update = this.chart.selectAll('.bar')
            .data(this.data);

        // remove exiting bars
        update.exit().remove();

        // update existing bars
        this.chart.selectAll('.bar').transition()

            .attr('x', d => this.xScale(d.index))
            .attr('y', d => this.yScale(d.value))
            .attr('width', d => this.xScale.bandwidth())
            .attr('height', d => this.height - this.yScale(d.value))
            .style('fill', (d, i) => this.colors(i));

        // add new bars
        update
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => this.xScale(d.index))
            .attr('y', d => this.yScale(0))
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .style('fill', (d, i) => this.colors(i))

        this.chart.selectAll('.bar').transition()
            //.delay((d, i) => i * 100 + 400)
            .attr('y', d => this.yScale(d.value))
            .attr('height', d => this.height - this.yScale(d.value));

    }
    setData(data) {
        if (data.length == 0) return;
        console.log("data",data);
        this.data = data;
    }
    init() {
        console.log("start init")
        this.createChart();
        if (this.data.length) {
            this.updateChart();
        }
        console.log("finish init");
    }
    load() {
        this.loaded = true;
        this.chart.selectAll('.bar')
            .attr('x', d => this.xScale(d.index))
            .attr('y', d => this.yScale(0))
            .attr('width', d => this.xScale.bandwidth())
            .attr('height', d => this.height - this.yScale(0))
            .style('fill', (d, i) => this.colors(i));

        this.chart.selectAll('.bar').transition()
            .delay((d, i) => i * 100 + 400)
            .attr('y', d => this.yScale(d.value))
            .attr('height', d => this.height - this.yScale(d.value));

    }
    ease() {
        this.loaded = false;
        this.chart.selectAll('.bar').transition()
            .delay((d, i) => i * 100)
            .attr('x', d => this.xScale(d.index))
            .attr('y', d => this.yScale(0))
            .attr('width', d => this.xScale.bandwidth())
            .attr('height', d => this.height - this.yScale(0))
            .style('fill', (d, i) => this.colors(i));

        let waitingTime = this.chart.selectAll('.bar')._groups[0].length * 100;
        /* if the chart doesn't load after certain time ( the time allows chart ease and then load again*/
        setTimeout(_ => {
            if (this.loaded) return;
            this.chart.selectAll('.bar').transition()
                .delay((d, i) => i * 100)
                .attr('y', d => this.yScale(d.value))
                .attr('height', d => this.height - this.yScale(d.value));
        }, waitingTime * 2 + 400);
    }

}
const sample = [
    {
        "value": "21",
        "index": "index1"
    },
    {
        "value": "20",
        "index": "index2"
    },
    {
        "value": "20",
        "index": "index3"
    },
    {
        "value": "20",
        "index": "index4"
    },
    {
        "value": "20",
        "index": "index5"
    },
    {
        "value": "20",
        "index": "index6"
    }
]
