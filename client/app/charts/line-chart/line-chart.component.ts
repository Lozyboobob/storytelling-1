import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
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
    private curtain: any; //for animation
    private dateMode: boolean;//date data in xAxis

    constructor() { 
       super()  
    }

    ngOnInit() {
        // Set the data
        this.data = [];
        this.setData(this.dataInput);
        this.dateMode = false;

        this.init();
    }

    setData(data: any) {
        if (data.length == 0) {
            data = [];
            sample.forEach((series, i) => {
                let s = [];
                series.forEach(d => s.push(Object.assign({}, d)))
                data.push(s);
            })

        }

        let parseDate = d3.timeParse("%b %Y");
        if (parseDate(data[0][0].xAxis) != null) this.dateMode = true;
        data.forEach((d) => {
            d.forEach((d) => {
                if (this.dateMode) {
                    d['xAxis'] = parseDate(d['xAxis']);
                }
                d['yAxis'] = parseFloat(d['yAxis']);
            })
        });
        this.data = data;

    }
    init() {

        let element = this.chartContainer.nativeElement;
        let margin = { top: 20, right: 20, bottom: 20, left: 20 };
        this.width = element.offsetWidth - margin.left - margin.right;
        this.height = element.offsetHeight - margin.top - margin.bottom;
        let svg = d3.select(element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);
        let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        console.log(this.data[0]);
        //concat array inside data
        let value = [];

        this.data.forEach((d) => {
            value = value.concat(d);
        })
        console.log("value list",value);
        //  x.domain(d3.extent(value, function(d) { return d.date; }));
        //  y.domain(d3.extent(value, function(d) { return d.yAxis; }));

        // define X & Y domains
        let xDomain;
        if (this.dateMode)
        xDomain = [d3.min(value, d =>   d['xAxis']), d3.max(value, d =>   d['xAxis'])];
        else xDomain = value.map(d =>   d['xAxis']);
        let yDomain = [0, d3.max(value, d => d['yAxis'])];

        // create scales
        let x;
        if (this.dateMode)
            x = d3.scaleTime().domain(xDomain).rangeRound([0, this.width]);
        else x = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        let y = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

        console.log(xDomain, yDomain);
        let line = d3.line()
            .x((d) => x(  d['xAxis']))
            .y((d) => y(d['yAxis']));


        g.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .attr("fill", "#999")
            .call(d3.axisBottom(x))

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text('yAxis')

        let colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);
        g.selectAll('.line')
            .data(this.data)
            .enter()
            .append('path')
            .attr('class', 'line')
            .attr("fill", "none")
            .attr("stroke", (d, i) => colors(i))
            .attr('d', (d) => line(d));

        /* Add 'curtain' rectangle to hide entire graph */
        this.curtain = g.append('rect')
            .attr('x', -1 * this.width)
            .attr('y', -1 * this.height)
            .attr('height', this.height)
            .attr('width', 0)
            .attr('class', 'curtain')
            .attr('transform', 'rotate(180)')
            .style('fill', '#fafafa')

    }

    load() {
        this.curtain
            .attr('width', this.width);

        this.curtain.transition()
            .duration(2000)
            .attr('width', 0);
    }

    ease() {
        this.curtain.transition()
            .duration(1250)
            .attr('width', this.width);

        this.curtain.transition()
            .delay(1250)
            .attr('width', 0);
    }



}
const sample = [
    [
        {
            "yAxis": "39.81",
            "xAxis": "Jan 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "36.35",
            "xAxis": "Feb 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "43.22",
            "xAxis": "Mar 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "28.37",
            "xAxis": "Apr 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "25.45",
            "xAxis": "May 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "32.54",
            "xAxis": "Jun 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "28.4",
            "xAxis": "Jul 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "28.4",
            "xAxis": "Aug 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "24.53",
            "xAxis": "Sep 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "28.02",
            "xAxis": "Oct 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "23.34",
            "xAxis": "Nov 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "17.65",
            "xAxis": "Dec 2000",
            "series": "MSFT"
        },
        {
            "yAxis": "24.84",
            "xAxis": "Jan 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "24",
            "xAxis": "Feb 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "22.25",
            "xAxis": "Mar 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "27.56",
            "xAxis": "Apr 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "28.14",
            "xAxis": "May 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "29.7",
            "xAxis": "Jun 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "26.93",
            "xAxis": "Jul 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "23.21",
            "xAxis": "Aug 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "20.82",
            "xAxis": "Sep 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "23.65",
            "xAxis": "Oct 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "26.12",
            "xAxis": "Nov 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "26.95",
            "xAxis": "Dec 2001",
            "series": "MSFT"
        },
        {
            "yAxis": "25.92",
            "xAxis": "Jan 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "23.73",
            "xAxis": "Feb 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "24.53",
            "xAxis": "Mar 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "21.26",
            "xAxis": "Apr 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "20.71",
            "xAxis": "May 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "22.25",
            "xAxis": "Jun 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "19.52",
            "xAxis": "Jul 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "19.97",
            "xAxis": "Aug 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "17.79",
            "xAxis": "Sep 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "21.75",
            "xAxis": "Oct 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "23.46",
            "xAxis": "Nov 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "21.03",
            "xAxis": "Dec 2002",
            "series": "MSFT"
        },
        {
            "yAxis": "19.31",
            "xAxis": "Jan 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "19.34",
            "xAxis": "Feb 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "19.76",
            "xAxis": "Mar 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "20.87",
            "xAxis": "Apr 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "20.09",
            "xAxis": "May 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "20.93",
            "xAxis": "Jun 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "21.56",
            "xAxis": "Jul 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "21.65",
            "xAxis": "Aug 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "22.69",
            "xAxis": "Sep 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "21.45",
            "xAxis": "Oct 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "21.1",
            "xAxis": "Nov 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "22.46",
            "xAxis": "Dec 2003",
            "series": "MSFT"
        },
        {
            "yAxis": "22.69",
            "xAxis": "Jan 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "21.77",
            "xAxis": "Feb 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "20.46",
            "xAxis": "Mar 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "21.45",
            "xAxis": "Apr 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "21.53",
            "xAxis": "May 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "23.44",
            "xAxis": "Jun 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "23.38",
            "xAxis": "Jul 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "22.47",
            "xAxis": "Aug 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "22.76",
            "xAxis": "Sep 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "23.02",
            "xAxis": "Oct 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "24.6",
            "xAxis": "Nov 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "24.52",
            "xAxis": "Dec 2004",
            "series": "MSFT"
        },
        {
            "yAxis": "24.11",
            "xAxis": "Jan 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "23.15",
            "xAxis": "Feb 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "22.24",
            "xAxis": "Mar 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "23.28",
            "xAxis": "Apr 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "23.82",
            "xAxis": "May 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "22.93",
            "xAxis": "Jun 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "23.64",
            "xAxis": "Jul 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "25.35",
            "xAxis": "Aug 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "23.83",
            "xAxis": "Sep 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "23.8",
            "xAxis": "Oct 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "25.71",
            "xAxis": "Nov 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "24.29",
            "xAxis": "Dec 2005",
            "series": "MSFT"
        },
        {
            "yAxis": "26.14",
            "xAxis": "Jan 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "25.04",
            "xAxis": "Feb 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "25.36",
            "xAxis": "Mar 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "22.5",
            "xAxis": "Apr 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "21.19",
            "xAxis": "May 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "21.8",
            "xAxis": "Jun 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "22.51",
            "xAxis": "Jul 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "24.13",
            "xAxis": "Aug 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "25.68",
            "xAxis": "Sep 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "26.96",
            "xAxis": "Oct 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "27.66",
            "xAxis": "Nov 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "28.13",
            "xAxis": "Dec 2006",
            "series": "MSFT"
        },
        {
            "yAxis": "29.07",
            "xAxis": "Jan 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "26.63",
            "xAxis": "Feb 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "26.35",
            "xAxis": "Mar 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "28.3",
            "xAxis": "Apr 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "29.11",
            "xAxis": "May 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "27.95",
            "xAxis": "Jun 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "27.5",
            "xAxis": "Jul 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "27.34",
            "xAxis": "Aug 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "28.04",
            "xAxis": "Sep 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "35.03",
            "xAxis": "Oct 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "32.09",
            "xAxis": "Nov 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "34",
            "xAxis": "Dec 2007",
            "series": "MSFT"
        },
        {
            "yAxis": "31.13",
            "xAxis": "Jan 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "26.07",
            "xAxis": "Feb 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "27.21",
            "xAxis": "Mar 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "27.34",
            "xAxis": "Apr 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "27.25",
            "xAxis": "May 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "26.47",
            "xAxis": "Jun 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "24.75",
            "xAxis": "Jul 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "26.36",
            "xAxis": "Aug 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "25.78",
            "xAxis": "Sep 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "21.57",
            "xAxis": "Oct 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "19.66",
            "xAxis": "Nov 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "18.91",
            "xAxis": "Dec 2008",
            "series": "MSFT"
        },
        {
            "yAxis": "16.63",
            "xAxis": "Jan 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "15.81",
            "xAxis": "Feb 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "17.99",
            "xAxis": "Mar 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "19.84",
            "xAxis": "Apr 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "20.59",
            "xAxis": "May 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "23.42",
            "xAxis": "Jun 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "23.18",
            "xAxis": "Jul 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "24.43",
            "xAxis": "Aug 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "25.49",
            "xAxis": "Sep 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "27.48",
            "xAxis": "Oct 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "29.27",
            "xAxis": "Nov 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "30.34",
            "xAxis": "Dec 2009",
            "series": "MSFT"
        },
        {
            "yAxis": "28.05",
            "xAxis": "Jan 2010",
            "series": "MSFT"
        },
        {
            "yAxis": "28.67",
            "xAxis": "Feb 2010",
            "series": "MSFT"
        },
        {
            "yAxis": "28.8",
            "xAxis": "Mar 2010",
            "series": "MSFT"
        }
    ],
    [
        {
            "yAxis": "64.56",
            "xAxis": "Jan 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "68.87",
            "xAxis": "Feb 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "67",
            "xAxis": "Mar 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "55.19",
            "xAxis": "Apr 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "48.31",
            "xAxis": "May 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "36.31",
            "xAxis": "Jun 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "30.12",
            "xAxis": "Jul 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "41.5",
            "xAxis": "Aug 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "38.44",
            "xAxis": "Sep 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "36.62",
            "xAxis": "Oct 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "24.69",
            "xAxis": "Nov 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "15.56",
            "xAxis": "Dec 2000",
            "series": "AMZN"
        },
        {
            "yAxis": "17.31",
            "xAxis": "Jan 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "10.19",
            "xAxis": "Feb 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "10.23",
            "xAxis": "Mar 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "15.78",
            "xAxis": "Apr 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "16.69",
            "xAxis": "May 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "14.15",
            "xAxis": "Jun 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "12.49",
            "xAxis": "Jul 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "8.94",
            "xAxis": "Aug 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "5.97",
            "xAxis": "Sep 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "6.98",
            "xAxis": "Oct 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "11.32",
            "xAxis": "Nov 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "10.82",
            "xAxis": "Dec 2001",
            "series": "AMZN"
        },
        {
            "yAxis": "14.19",
            "xAxis": "Jan 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "14.1",
            "xAxis": "Feb 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "14.3",
            "xAxis": "Mar 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "16.69",
            "xAxis": "Apr 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "18.23",
            "xAxis": "May 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "16.25",
            "xAxis": "Jun 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "14.45",
            "xAxis": "Jul 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "14.94",
            "xAxis": "Aug 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "15.93",
            "xAxis": "Sep 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "19.36",
            "xAxis": "Oct 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "23.35",
            "xAxis": "Nov 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "18.89",
            "xAxis": "Dec 2002",
            "series": "AMZN"
        },
        {
            "yAxis": "21.85",
            "xAxis": "Jan 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "22.01",
            "xAxis": "Feb 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "26.03",
            "xAxis": "Mar 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "28.69",
            "xAxis": "Apr 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "35.89",
            "xAxis": "May 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "36.32",
            "xAxis": "Jun 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "41.64",
            "xAxis": "Jul 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "46.32",
            "xAxis": "Aug 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "48.43",
            "xAxis": "Sep 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "54.43",
            "xAxis": "Oct 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "53.97",
            "xAxis": "Nov 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "52.62",
            "xAxis": "Dec 2003",
            "series": "AMZN"
        },
        {
            "yAxis": "50.4",
            "xAxis": "Jan 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "43.01",
            "xAxis": "Feb 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "43.28",
            "xAxis": "Mar 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "43.6",
            "xAxis": "Apr 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "48.5",
            "xAxis": "May 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "54.4",
            "xAxis": "Jun 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "38.92",
            "xAxis": "Jul 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "38.14",
            "xAxis": "Aug 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "40.86",
            "xAxis": "Sep 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "34.13",
            "xAxis": "Oct 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "39.68",
            "xAxis": "Nov 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "44.29",
            "xAxis": "Dec 2004",
            "series": "AMZN"
        },
        {
            "yAxis": "43.22",
            "xAxis": "Jan 2005",
            "series": "AMZN"
        },
        {
            "yAxis": "33.22",
            "xAxis": "Apr 2005",
            "series": "AMZN"
        },
        {
            "yAxis": "35.51",
            "xAxis": "May 2005",
            "series": "AMZN"
        },
        {
            "yAxis": "33.09",
            "xAxis": "Jun 2005",
            "series": "AMZN"
        },
        {
            "yAxis": "45.15",
            "xAxis": "Jul 2005",
            "series": "AMZN"
        },
        {
            "yAxis": "42.7",
            "xAxis": "Aug 2005",
            "series": "AMZN"
        },
        {
            "yAxis": "45.3",
            "xAxis": "Sep 2005",
            "series": "AMZN"
        },
        {
            "yAxis": "39.86",
            "xAxis": "Oct 2005",
            "series": "AMZN"
        },
        {
            "yAxis": "48.46",
            "xAxis": "Nov 2005",
            "series": "AMZN"
        },
        {
            "yAxis": "47.15",
            "xAxis": "Dec 2005",
            "series": "AMZN"
        },
        {
            "yAxis": "44.82",
            "xAxis": "Jan 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "37.44",
            "xAxis": "Feb 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "36.53",
            "xAxis": "Mar 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "35.21",
            "xAxis": "Apr 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "34.61",
            "xAxis": "May 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "38.68",
            "xAxis": "Jun 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "26.89",
            "xAxis": "Jul 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "30.83",
            "xAxis": "Aug 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "32.12",
            "xAxis": "Sep 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "38.09",
            "xAxis": "Oct 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "40.34",
            "xAxis": "Nov 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "39.46",
            "xAxis": "Dec 2006",
            "series": "AMZN"
        },
        {
            "yAxis": "37.67",
            "xAxis": "Jan 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "39.14",
            "xAxis": "Feb 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "39.79",
            "xAxis": "Mar 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "61.33",
            "xAxis": "Apr 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "69.14",
            "xAxis": "May 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "68.41",
            "xAxis": "Jun 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "78.54",
            "xAxis": "Jul 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "79.91",
            "xAxis": "Aug 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "93.15",
            "xAxis": "Sep 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "89.15",
            "xAxis": "Oct 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "90.56",
            "xAxis": "Nov 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "92.64",
            "xAxis": "Dec 2007",
            "series": "AMZN"
        },
        {
            "yAxis": "77.7",
            "xAxis": "Jan 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "64.47",
            "xAxis": "Feb 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "71.3",
            "xAxis": "Mar 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "78.63",
            "xAxis": "Apr 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "81.62",
            "xAxis": "May 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "73.33",
            "xAxis": "Jun 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "76.34",
            "xAxis": "Jul 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "80.81",
            "xAxis": "Aug 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "72.76",
            "xAxis": "Sep 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "57.24",
            "xAxis": "Oct 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "42.7",
            "xAxis": "Nov 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "51.28",
            "xAxis": "Dec 2008",
            "series": "AMZN"
        },
        {
            "yAxis": "58.82",
            "xAxis": "Jan 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "64.79",
            "xAxis": "Feb 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "73.44",
            "xAxis": "Mar 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "80.52",
            "xAxis": "Apr 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "77.99",
            "xAxis": "May 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "83.66",
            "xAxis": "Jun 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "85.76",
            "xAxis": "Jul 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "81.19",
            "xAxis": "Aug 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "93.36",
            "xAxis": "Sep 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "118.81",
            "xAxis": "Oct 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "135.91",
            "xAxis": "Nov 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "134.52",
            "xAxis": "Dec 2009",
            "series": "AMZN"
        },
        {
            "yAxis": "125.41",
            "xAxis": "Jan 2010",
            "series": "AMZN"
        },
        {
            "yAxis": "118.4",
            "xAxis": "Feb 2010",
            "series": "AMZN"
        },
        {
            "yAxis": "128.82",
            "xAxis": "Mar 2010",
            "series": "AMZN"
        }
    ],
    [
        {
            "yAxis": "100.52",
            "xAxis": "Jan 2000",
            "series": "IBM"
        },
        {
            "yAxis": "92.11",
            "xAxis": "Feb 2000",
            "series": "IBM"
        },
        {
            "yAxis": "106.11",
            "xAxis": "Mar 2000",
            "series": "IBM"
        },
        {
            "yAxis": "99.95",
            "xAxis": "Apr 2000",
            "series": "IBM"
        },
        {
            "yAxis": "96.31",
            "xAxis": "May 2000",
            "series": "IBM"
        },
        {
            "yAxis": "98.33",
            "xAxis": "Jun 2000",
            "series": "IBM"
        },
        {
            "yAxis": "100.74",
            "xAxis": "Jul 2000",
            "series": "IBM"
        },
        {
            "yAxis": "118.62",
            "xAxis": "Aug 2000",
            "series": "IBM"
        },
        {
            "yAxis": "101.19",
            "xAxis": "Sep 2000",
            "series": "IBM"
        },
        {
            "yAxis": "88.5",
            "xAxis": "Oct 2000",
            "series": "IBM"
        },
        {
            "yAxis": "84.12",
            "xAxis": "Nov 2000",
            "series": "IBM"
        },
        {
            "yAxis": "76.47",
            "xAxis": "Dec 2000",
            "series": "IBM"
        },
        {
            "yAxis": "100.76",
            "xAxis": "Jan 2001",
            "series": "IBM"
        },
        {
            "yAxis": "89.98",
            "xAxis": "Feb 2001",
            "series": "IBM"
        },
        {
            "yAxis": "86.63",
            "xAxis": "Mar 2001",
            "series": "IBM"
        },
        {
            "yAxis": "103.7",
            "xAxis": "Apr 2001",
            "series": "IBM"
        },
        {
            "yAxis": "100.82",
            "xAxis": "May 2001",
            "series": "IBM"
        },
        {
            "yAxis": "102.35",
            "xAxis": "Jun 2001",
            "series": "IBM"
        },
        {
            "yAxis": "94.87",
            "xAxis": "Jul 2001",
            "series": "IBM"
        },
        {
            "yAxis": "90.25",
            "xAxis": "Aug 2001",
            "series": "IBM"
        },
        {
            "yAxis": "82.82",
            "xAxis": "Sep 2001",
            "series": "IBM"
        },
        {
            "yAxis": "97.58",
            "xAxis": "Oct 2001",
            "series": "IBM"
        },
        {
            "yAxis": "104.5",
            "xAxis": "Nov 2001",
            "series": "IBM"
        },
        {
            "yAxis": "109.36",
            "xAxis": "Dec 2001",
            "series": "IBM"
        },
        {
            "yAxis": "97.54",
            "xAxis": "Jan 2002",
            "series": "IBM"
        },
        {
            "yAxis": "88.82",
            "xAxis": "Feb 2002",
            "series": "IBM"
        },
        {
            "yAxis": "94.15",
            "xAxis": "Mar 2002",
            "series": "IBM"
        },
        {
            "yAxis": "75.82",
            "xAxis": "Apr 2002",
            "series": "IBM"
        },
        {
            "yAxis": "72.97",
            "xAxis": "May 2002",
            "series": "IBM"
        },
        {
            "yAxis": "65.31",
            "xAxis": "Jun 2002",
            "series": "IBM"
        },
        {
            "yAxis": "63.86",
            "xAxis": "Jul 2002",
            "series": "IBM"
        },
        {
            "yAxis": "68.52",
            "xAxis": "Aug 2002",
            "series": "IBM"
        },
        {
            "yAxis": "53.01",
            "xAxis": "Sep 2002",
            "series": "IBM"
        },
        {
            "yAxis": "71.76",
            "xAxis": "Oct 2002",
            "series": "IBM"
        },
        {
            "yAxis": "79.16",
            "xAxis": "Nov 2002",
            "series": "IBM"
        },
        {
            "yAxis": "70.58",
            "xAxis": "Dec 2002",
            "series": "IBM"
        },
        {
            "yAxis": "71.22",
            "xAxis": "Jan 2003",
            "series": "IBM"
        },
        {
            "yAxis": "71.13",
            "xAxis": "Feb 2003",
            "series": "IBM"
        },
        {
            "yAxis": "71.57",
            "xAxis": "Mar 2003",
            "series": "IBM"
        },
        {
            "yAxis": "77.47",
            "xAxis": "Apr 2003",
            "series": "IBM"
        },
        {
            "yAxis": "80.48",
            "xAxis": "May 2003",
            "series": "IBM"
        },
        {
            "yAxis": "75.42",
            "xAxis": "Jun 2003",
            "series": "IBM"
        },
        {
            "yAxis": "74.28",
            "xAxis": "Jul 2003",
            "series": "IBM"
        },
        {
            "yAxis": "75.12",
            "xAxis": "Aug 2003",
            "series": "IBM"
        },
        {
            "yAxis": "80.91",
            "xAxis": "Sep 2003",
            "series": "IBM"
        },
        {
            "yAxis": "81.96",
            "xAxis": "Oct 2003",
            "series": "IBM"
        },
        {
            "yAxis": "83.08",
            "xAxis": "Nov 2003",
            "series": "IBM"
        },
        {
            "yAxis": "85.05",
            "xAxis": "Dec 2003",
            "series": "IBM"
        },
        {
            "yAxis": "91.06",
            "xAxis": "Jan 2004",
            "series": "IBM"
        },
        {
            "yAxis": "88.7",
            "xAxis": "Feb 2004",
            "series": "IBM"
        },
        {
            "yAxis": "84.41",
            "xAxis": "Mar 2004",
            "series": "IBM"
        },
        {
            "yAxis": "81.04",
            "xAxis": "Apr 2004",
            "series": "IBM"
        },
        {
            "yAxis": "81.59",
            "xAxis": "May 2004",
            "series": "IBM"
        },
        {
            "yAxis": "81.19",
            "xAxis": "Jun 2004",
            "series": "IBM"
        },
        {
            "yAxis": "80.19",
            "xAxis": "Jul 2004",
            "series": "IBM"
        },
        {
            "yAxis": "78.17",
            "xAxis": "Aug 2004",
            "series": "IBM"
        },
        {
            "yAxis": "79.13",
            "xAxis": "Sep 2004",
            "series": "IBM"
        },
        {
            "yAxis": "82.84",
            "xAxis": "Oct 2004",
            "series": "IBM"
        },
        {
            "yAxis": "87.15",
            "xAxis": "Nov 2004",
            "series": "IBM"
        },
        {
            "yAxis": "91.16",
            "xAxis": "Dec 2004",
            "series": "IBM"
        },
        {
            "yAxis": "86.39",
            "xAxis": "Jan 2005",
            "series": "IBM"
        },
        {
            "yAxis": "85.78",
            "xAxis": "Feb 2005",
            "series": "IBM"
        },
        {
            "yAxis": "84.66",
            "xAxis": "Mar 2005",
            "series": "IBM"
        },
        {
            "yAxis": "70.77",
            "xAxis": "Apr 2005",
            "series": "IBM"
        },
        {
            "yAxis": "70.18",
            "xAxis": "May 2005",
            "series": "IBM"
        },
        {
            "yAxis": "68.93",
            "xAxis": "Jun 2005",
            "series": "IBM"
        },
        {
            "yAxis": "77.53",
            "xAxis": "Jul 2005",
            "series": "IBM"
        },
        {
            "yAxis": "75.07",
            "xAxis": "Aug 2005",
            "series": "IBM"
        },
        {
            "yAxis": "74.7",
            "xAxis": "Sep 2005",
            "series": "IBM"
        },
        {
            "yAxis": "76.25",
            "xAxis": "Oct 2005",
            "series": "IBM"
        },
        {
            "yAxis": "82.98",
            "xAxis": "Nov 2005",
            "series": "IBM"
        },
        {
            "yAxis": "76.73",
            "xAxis": "Dec 2005",
            "series": "IBM"
        },
        {
            "yAxis": "75.89",
            "xAxis": "Jan 2006",
            "series": "IBM"
        },
        {
            "yAxis": "75.09",
            "xAxis": "Feb 2006",
            "series": "IBM"
        },
        {
            "yAxis": "77.17",
            "xAxis": "Mar 2006",
            "series": "IBM"
        },
        {
            "yAxis": "77.05",
            "xAxis": "Apr 2006",
            "series": "IBM"
        },
        {
            "yAxis": "75.04",
            "xAxis": "May 2006",
            "series": "IBM"
        },
        {
            "yAxis": "72.15",
            "xAxis": "Jun 2006",
            "series": "IBM"
        },
        {
            "yAxis": "72.7",
            "xAxis": "Jul 2006",
            "series": "IBM"
        },
        {
            "yAxis": "76.35",
            "xAxis": "Aug 2006",
            "series": "IBM"
        },
        {
            "yAxis": "77.26",
            "xAxis": "Sep 2006",
            "series": "IBM"
        },
        {
            "yAxis": "87.06",
            "xAxis": "Oct 2006",
            "series": "IBM"
        },
        {
            "yAxis": "86.95",
            "xAxis": "Nov 2006",
            "series": "IBM"
        },
        {
            "yAxis": "91.9",
            "xAxis": "Dec 2006",
            "series": "IBM"
        },
        {
            "yAxis": "93.79",
            "xAxis": "Jan 2007",
            "series": "IBM"
        },
        {
            "yAxis": "88.18",
            "xAxis": "Feb 2007",
            "series": "IBM"
        },
        {
            "yAxis": "89.44",
            "xAxis": "Mar 2007",
            "series": "IBM"
        },
        {
            "yAxis": "96.98",
            "xAxis": "Apr 2007",
            "series": "IBM"
        },
        {
            "yAxis": "101.54",
            "xAxis": "May 2007",
            "series": "IBM"
        },
        {
            "yAxis": "100.25",
            "xAxis": "Jun 2007",
            "series": "IBM"
        },
        {
            "yAxis": "105.4",
            "xAxis": "Jul 2007",
            "series": "IBM"
        },
        {
            "yAxis": "111.54",
            "xAxis": "Aug 2007",
            "series": "IBM"
        },
        {
            "yAxis": "112.6",
            "xAxis": "Sep 2007",
            "series": "IBM"
        },
        {
            "yAxis": "111",
            "xAxis": "Oct 2007",
            "series": "IBM"
        },
        {
            "yAxis": "100.9",
            "xAxis": "Nov 2007",
            "series": "IBM"
        },
        {
            "yAxis": "103.7",
            "xAxis": "Dec 2007",
            "series": "IBM"
        },
        {
            "yAxis": "102.75",
            "xAxis": "Jan 2008",
            "series": "IBM"
        },
        {
            "yAxis": "109.64",
            "xAxis": "Feb 2008",
            "series": "IBM"
        },
        {
            "yAxis": "110.87",
            "xAxis": "Mar 2008",
            "series": "IBM"
        },
        {
            "yAxis": "116.23",
            "xAxis": "Apr 2008",
            "series": "IBM"
        },
        {
            "yAxis": "125.14",
            "xAxis": "May 2008",
            "series": "IBM"
        },
        {
            "yAxis": "114.6",
            "xAxis": "Jun 2008",
            "series": "IBM"
        },
        {
            "yAxis": "123.74",
            "xAxis": "Jul 2008",
            "series": "IBM"
        },
        {
            "yAxis": "118.16",
            "xAxis": "Aug 2008",
            "series": "IBM"
        },
        {
            "yAxis": "113.53",
            "xAxis": "Sep 2008",
            "series": "IBM"
        },
        {
            "yAxis": "90.24",
            "xAxis": "Oct 2008",
            "series": "IBM"
        },
        {
            "yAxis": "79.65",
            "xAxis": "Nov 2008",
            "series": "IBM"
        },
        {
            "yAxis": "82.15",
            "xAxis": "Dec 2008",
            "series": "IBM"
        },
        {
            "yAxis": "89.46",
            "xAxis": "Jan 2009",
            "series": "IBM"
        },
        {
            "yAxis": "90.32",
            "xAxis": "Feb 2009",
            "series": "IBM"
        },
        {
            "yAxis": "95.09",
            "xAxis": "Mar 2009",
            "series": "IBM"
        },
        {
            "yAxis": "101.29",
            "xAxis": "Apr 2009",
            "series": "IBM"
        },
        {
            "yAxis": "104.85",
            "xAxis": "May 2009",
            "series": "IBM"
        },
        {
            "yAxis": "103.01",
            "xAxis": "Jun 2009",
            "series": "IBM"
        },
        {
            "yAxis": "116.34",
            "xAxis": "Jul 2009",
            "series": "IBM"
        },
        {
            "yAxis": "117",
            "xAxis": "Aug 2009",
            "series": "IBM"
        },
        {
            "yAxis": "118.55",
            "xAxis": "Sep 2009",
            "series": "IBM"
        },
        {
            "yAxis": "119.54",
            "xAxis": "Oct 2009",
            "series": "IBM"
        },
        {
            "yAxis": "125.79",
            "xAxis": "Nov 2009",
            "series": "IBM"
        },
        {
            "yAxis": "130.32",
            "xAxis": "Dec 2009",
            "series": "IBM"
        },
        {
            "yAxis": "121.85",
            "xAxis": "Jan 2010",
            "series": "IBM"
        },
        {
            "yAxis": "127.16",
            "xAxis": "Feb 2010",
            "series": "IBM"
        },
        {
            "yAxis": "125.55",
            "xAxis": "Mar 2010",
            "series": "IBM"
        }
    ]

]
