import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as _ from 'lodash';
import * as d3 from 'd3';
import { nest } from 'd3-collection';
import {Chart} from '../chart.class';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent extends Chart implements OnInit {
    @ViewChild('chart') private chartContainer: ElementRef;
    private data: Array<any> = [];
    private width: number;
    private height: number;
    private heightTB: number; //height of thumbnail
    private curtain: any; //for animation
    private dateMode: boolean;//date data in xAxis
    private tb;
    private paths;
    private dots;
    private chartOptions: any;
    constructor() {
        super()
    }

    ngOnInit() {
        this.chartOptions = { ...this.configInput };

        this.init();
    }
    /**
     * Process json Data to D3.js Bar chart format
     * @param dataDims :  string[] Selected Dimentions
     * @param rawData : array<Object> Json data
     */
    public static convertData(dataDims: string[], rawData: any) {
        const name$ = d => d[dataDims[0]];
        const name2$ = d => d[dataDims[1]];
        const value$ = d => d[dataDims[2]];

        const root = [{ xAxis: dataDims[1], yAxis: dataDims[2], series: dataDims[0] }];
        let result = nest()
          //  .key(name$)
            .key(name$)
            .entries(rawData)
            .map(series);
        console.log(result)
        return result;

        function series(d) {
            return d.values.map(seriesPoints)
            ;
        }
        function seriesPoints(d) {
            return {
                xAxis: name2$(d),
                yAxis: value$(d),
                series:d[dataDims[0]]
            };
        }
    }

    brushed(x, xTB, xAxis, svg, area, focus, zoom) {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
        var s = d3.event.selection || xTB.range();
        x.domain(s.map(xTB.invert, xTB));
        focus.select(".area").attr("d", area);
        focus.select(".axis--x").call(xAxis);
        svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
            .scale(this.width / (s[1] - s[0]))
            .translate(-s[0], 0));
    }
    zoomed(x, xTB, area, xAxis, brush, focus, context) {
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
        var t = d3.event.transform;
        x.domain(t.rescaleX(xTB).domain());
        focus.select(".area").attr("d", area);
        focus.select(".axis--x").call(xAxis);
        context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
    }
    setData(data: any) {

        let parseDate = d3.timeParse("%b %Y");
        this.data = JSON.parse(JSON.stringify(data));
        if (parseDate(this.data[0][0].xAxis) != null) this.dateMode = true;
        this.data.forEach((d) => {
            d.forEach((d) => {
                if (this.dateMode) {
                    d['xAxis'] = parseDate(d['xAxis']);
                }
                d['yAxis'] = parseFloat(d['yAxis']);
            })
        });
        console.log(this.dataInput);

    }
    drawChart() {
      console.log("draw")
        // Set the data
        this.data = [];
        this.dateMode = false;
        this.heightTB = 60;
        console.log(this.dataInput);
        this.setData(this.dataInput);
        console.log(this.dateMode);
        let element = this.chartContainer.nativeElement;
        let margin = { top: 0, right: 50, bottom: 0, left: 50 };
        this.width = element.offsetWidth - margin.left - margin.right;
        this.height = element.offsetHeight - margin.top - margin.bottom - this.heightTB;

        // Define the div for the tooltip
        var div = d3.select(element).append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        let svg = d3.select(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight - this.heightTB)
            .attr('transform', 'translate(' + 0 + ',' + this.height / 2 + ')');

        let value = [];
        this.data.forEach((d) => {
            value = value.concat(d);
        })

        // define X & Y domains
        let xDomain;
        if (this.dateMode)
            xDomain = [d3.min(value, d => d['xAxis']), d3.max(value, d => d['xAxis'])];
        else xDomain = value.map(d => d['xAxis']);
        let yDomain = [0, d3.max(value, d => d['yAxis'])];

        /*zoom */
        let zoomScale = 1;
        let zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [this.width, this.height]])
            .extent([[0, 0], [this.width, this.height]])
            .on("zoom", _ => {
                if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush

                var t = d3.event.transform;
                x.domain(t.rescaleX(xTB).domain());
                focus.selectAll(".line").attr("d", line);
                focus.selectAll(".xAxis").call(xAxis);
                this.tb.select(".brush").call(brush.move, x.range().map(t.invertX, t));
                //t.k is the scale
                zoomScale = t.k
                svg.selectAll('.dot')
                    .attr("cx", d => x(d['xAxis']))
                    .attr("cy", d => y(d['yAxis']));
                if (t.k > 3) {
                    svg.selectAll('.dot').transition()
                        .duration(500)
                        .attr('opacity', 1);
                }
                else {
                    svg.selectAll('.dot').transition()
                        .duration(100)
                        .attr('opacity', 0);
                }
            });
        svg.append('rect')
            .attr("class", "zoom")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(zoom);
        /*chart area*/
        let focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let x;
        if (this.dateMode) {
            x = d3.scaleTime().domain(xDomain).rangeRound([0, this.width]);
        }

        else {
            x = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        }
        let y = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

        let line = d3.line()
            .x((d) => x(d['xAxis']))
            .y((d) => y(d['yAxis']));

        //create axis for line chart
        let xAxis = d3.axisBottom(x);
        focus.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .attr("class", "axis xAxis")
            .call(xAxis)
        focus.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y))
            .append("text")

            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text('yAxis')


        //draw line for line chart
        let colors: any = d3.scaleOrdinal(d3.schemeCategory20);
        let pathContainer = focus.append("svg")
            .attr("class", "pathContainer")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        this.paths = pathContainer.selectAll('.line')
            .data(this.data)
            .enter()
            .append('path')
            .attr('class', 'line')
            .attr("fill", "none")
            .attr("stroke", (d, i) => colors(i))
            .attr('d', (d) => line(d));


        //*thumbnail*//
        let marginTopTB = margin.top + this.height + 40;
        this.tb = svg.append('g')
            .attr('class', 'thumbnail')
            .attr("transform", "translate(" + margin.left + "," + marginTopTB + ")");

        let xTB;
        if (this.dateMode) {
            xTB = d3.scaleTime().domain(xDomain).rangeRound([0, this.width]);
        }
        else {
            xTB = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        }
        let yTB = d3.scaleLinear().domain(yDomain).range([this.heightTB, 0]);

        let lineTB = d3.line()
            .x((d) => xTB(d['xAxis']))
            .y((d) => yTB(d['yAxis']));

        //creat axis for thumbnail
        let xAxisTB = d3.axisBottom(xTB)
        this.tb.append("g")
            .attr("transform", "translate(0," + this.heightTB + ")")
            .attr("class", "axis")
            .call(xAxisTB);

        //draw line for thumbnail
        let linesTB = this.tb.selectAll('.line')
            .data(this.data)
            .enter()
            .append('path')
            .attr('class', 'lineTB')
            .attr("fill", "none")
            .attr("stroke", (d, i) => colors(i))
            .attr('d', (d) => lineTB(d));



        let brush = d3.brushX()
            .extent([[0, 0], [this.width, this.heightTB]])
            .on("brush end", _ => {
                if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
                svg.selectAll('.dot').transition()
                    .duration(0)
                    .attr('opacity', 0);
                var s = d3.event.selection || xTB.range();
                x.domain(s.map(xTB.invert, xTB));
                focus.selectAll(".line").attr("d", line);
                focus.selectAll(".xAxis").call(xAxis);
                svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                    .scale(this.width / (s[1] - s[0]))
                    .translate(-s[0], 0));
            });


        /*brush*/
        this.tb.append("g")
            .attr("class", "brush")
            .call(brush)
            .call(brush.move, x.range());

        // Add the scatterplot
        let dotContainer = focus.append("svg").attr("class", "dotContainer").attr("width", this.width)
            .attr("height", this.height).attr("transform", "translate(1500,0)")
        for (let i = 0; i < this.data.length; i++) {
            let dots = dotContainer.append('g').attr('class', 'dots dots' + i);
            this.dots = dots.selectAll(".dot")
                .data(this.data[i])
                .enter()
                .append("circle")
                .attr('class', 'dot')
                .attr('opacity', 0)
                .attr("r", 7)
                .attr("fill", colors(i))
                .attr("cx", d => x(d['xAxis']))
                .attr("cy", d => y(d['yAxis']))
                .on("mouseover", function(d) {
                    let curR = parseInt(d3.select(d3.event.srcElement).attr("r"))
                    d3.select(d3.event.srcElement)
                        .transition()
                        .duration(200)
                        .attr('r', _ => zoomScale > 3 ? 20 : 7)
                        .attr('opacity', 1)
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html('<p>' + d["xAxis"] + "<br/>" + d["yAxis"] + '</p>')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 25) + "px");
                })
                .on("mouseout", function(d) {
                    let curR = parseInt(d3.select(d3.event.srcElement).attr("r"))
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                    d3.select(d3.event.srcElement)
                        .transition()
                        .duration(200)
                        .attr('r', 7)
                        .attr('opacity', _ => zoomScale > 3 ? 1 : 0)
                });

        }
        /* Add 'curtain' rectangle to hide entire graph */
        this.curtain = svg.append('rect')
            .attr('x', -1 * this.width)
            .attr('y', -1 * this.height)
            .attr('height', this.height)
            .attr('width', 0)
            .attr('class', 'curtain')
            .attr('transform', "rotate(180) translate(" + (0 - margin.left) + "," + margin.top + ")")
            .style('fill', '#fafafa')

    }
    init() {
        if (this.configInput != null)
            this.data = LineChartComponent.convertData(this.chartOptions.dataDims, this.dataInput);
        else
            this.data = this.dataInput;
            console.log(this.data);
        this.drawChart();
        this.load();
    }

    load() {
        this.curtain
            .attr('width', this.width);
        this.tb
            .attr('opacity', 0);
        this.curtain.transition()
            .duration(2000)
            .attr('width', 0);
        this.tb.transition()
            .delay(800)
            .duration(1000)
            .attr('opacity', 1);
    }

    ease() {

        this.curtain.transition()
            .duration(800)
            .attr('width', this.width);
        this.tb.transition()
            .duration(1000)
            .attr('opacity', 0);
        this.curtain.transition()
            .delay(1250)
            .attr('width', 0);
        this.tb.transition()
            .delay(1250)
            .attr('opacity', 1);

    }



}
