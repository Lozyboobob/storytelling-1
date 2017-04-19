import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
    @ViewChild('chart') private chartContainer: ElementRef;
    private data: Array<any> = [];
    private data2: Array<any> = [];
    private width: number;
    private height: number;
    constructor() { }

    ngOnInit() {
        this.data = [];
        this.data2 = [];
    }
    public setData(data) {
        console.log(data)
        var parseDate = d3.timeParse("%b %Y");
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.price = parseFloat(d.price);
        });
        // Filter to one symbol; the S&P 500.
        let values = data.filter(function(d) {
            return d.symbol == "AMZN";;
        });
        this.data = values;
        console.log(this.data)
        /*    var msft = data.filter(function(d) {
                return d.symbol == "MSFT";
            });
            this.data.push(msft);
            var ibm = data.filter(function(d) {
                return d.symbol == 'IBM';

            });
            this.data.push(ibm);
            console.log(this.data);*/


    }
    public init() {



        let element = this.chartContainer.nativeElement;

        let margin = { top: 20, right: 20, bottom: 30, left: 50 };

        this.width = element.offsetWidth - margin.left - margin.right;
        this.height = element.offsetHeight - margin.top - margin.bottom;
        let svg = d3.select(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);
        let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // define X & Y domains
        let xDomain = this.data.map(d => d.date);
        let yDomain = [0, d3.max(this.data, d => { console.log(d.price); return d.price })];
        console.log(d3.max(this.data, d => { console.log(d.price); return d.price }));
        let x = d3.scaleTime().rangeRound([0, this.width]);
        x.domain(d3.extent(this.data, function(d) { return d.date; }));
        let y = d3.scaleLinear().domain(yDomain)
            .rangeRound([this.height, 0]);

        let line = d3.line()
            .x((d) => x(d['date']))
            .y((d) => y(d['price']));





        /*  x.domain([this.data[0].date, this.data[this.data.length - 1].date]);
          y.domain([0, d3.max(this.data, function(d) { return d.price; })]).nice();*/

        g.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .attr("fill", "#999")
            .call(d3.axisBottom(x))

        //  .select(".domain")
        //.remove();

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)")

        console.log(this.data);
        g.selectAll('.line')
            .data([this.data])
            .enter()
            .append('path')
            .attr('class', 'line')
            .attr("fill", "none")
            .attr("stroke", "steelblue")

            .attr('d', line);
        /* Add 'curtain' rectangle to hide entire graph */
        var curtain = g.append('rect')
            .attr('x', -1 * this.width)
            .attr('y', -1 * this.height)
            .attr('height', this.height)
            .attr('width', this.width)
            .attr('class', 'curtain')
            .attr('transform', 'rotate(180)')
            .style('fill', '#fafafa')
        /* Create a shared transition for anything we're animating */

        curtain
            .transition()
            .duration(2000)
            .attr('width', 0);



    }

    public load() {

    }

    public ease() { }


}
const dataSample1 = [
    { x: 23, y: 12 },
    { x: 24, y: 13 },
    { x: 25, y: 14 },
    { x: 26, y: 15 },
    { x: 27, y: 16 }
]
const dataSample2 = [
    { x: 27, y: 12 },
    { x: 26, y: 13 },
    { x: 25, y: 14 },
    { x: 24, y: 15 },
    { x: 23, y: 16 }
]
