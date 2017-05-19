import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import {Chart} from '../chart.interface';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, Chart {
    @ViewChild('chart') private chartContainer: ElementRef;
    private data: Array<any> = [];
    private width: number;
    private height: number;
    private curtain: any; //for animation
    private dateMode: boolean;
    constructor() { }

    ngOnInit() {
        this.data = [];
        this.dateMode = false;

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
        if (parseDate(data[0][0].date) != null) this.dateMode = true;
        data.forEach((d) => {
            d.forEach((d) => {
                if (this.dateMode) {
                    d.date = parseDate(d.date);
                }
                d.price = parseFloat(d.price);
            })
        });
        this.data = data;
        console.log("data key", Object.keys(this.data[0][0]));
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
        let value: Array<{ date: Date, price: number }> = [];

        this.data.forEach((d) => {
            value = value.concat(d);
        })
        console.log("end block");
        //  x.domain(d3.extent(value, function(d) { return d.date; }));
        //  y.domain(d3.extent(value, function(d) { return d.price; }));

        // define X & Y domains
        console.log(this.data);
        let xDomain;
        if (this.dateMode)
        xDomain = [d3.min(value, d => d.date), d3.max(value, d => d.date)];
        else xDomain = value.map(d => d.date);
        let yDomain = [0, d3.max(value, d => d.price)];

        // create scales
        let x;
        if (this.dateMode)
            x = d3.scaleTime().domain(xDomain).rangeRound([0, this.width]);
        else x = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        let y = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

        console.log(xDomain, yDomain);
        let line = d3.line()
            .x((d) => x(d['date']))
            .y((d) => y(d['price']));


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
            .text("Price ($)")

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
            "price": "39.81",
            "date": "Jan 2000",
            "symbol": "MSFT"
        },
        {
            "price": "36.35",
            "date": "Feb 2000",
            "symbol": "MSFT"
        },
        {
            "price": "43.22",
            "date": "Mar 2000",
            "symbol": "MSFT"
        },
        {
            "price": "28.37",
            "date": "Apr 2000",
            "symbol": "MSFT"
        },
        {
            "price": "25.45",
            "date": "May 2000",
            "symbol": "MSFT"
        },
        {
            "price": "32.54",
            "date": "Jun 2000",
            "symbol": "MSFT"
        },
        {
            "price": "28.4",
            "date": "Jul 2000",
            "symbol": "MSFT"
        },
        {
            "price": "28.4",
            "date": "Aug 2000",
            "symbol": "MSFT"
        },
        {
            "price": "24.53",
            "date": "Sep 2000",
            "symbol": "MSFT"
        },
        {
            "price": "28.02",
            "date": "Oct 2000",
            "symbol": "MSFT"
        },
        {
            "price": "23.34",
            "date": "Nov 2000",
            "symbol": "MSFT"
        },
        {
            "price": "17.65",
            "date": "Dec 2000",
            "symbol": "MSFT"
        },
        {
            "price": "24.84",
            "date": "Jan 2001",
            "symbol": "MSFT"
        },
        {
            "price": "24",
            "date": "Feb 2001",
            "symbol": "MSFT"
        },
        {
            "price": "22.25",
            "date": "Mar 2001",
            "symbol": "MSFT"
        },
        {
            "price": "27.56",
            "date": "Apr 2001",
            "symbol": "MSFT"
        },
        {
            "price": "28.14",
            "date": "May 2001",
            "symbol": "MSFT"
        },
        {
            "price": "29.7",
            "date": "Jun 2001",
            "symbol": "MSFT"
        },
        {
            "price": "26.93",
            "date": "Jul 2001",
            "symbol": "MSFT"
        },
        {
            "price": "23.21",
            "date": "Aug 2001",
            "symbol": "MSFT"
        },
        {
            "price": "20.82",
            "date": "Sep 2001",
            "symbol": "MSFT"
        },
        {
            "price": "23.65",
            "date": "Oct 2001",
            "symbol": "MSFT"
        },
        {
            "price": "26.12",
            "date": "Nov 2001",
            "symbol": "MSFT"
        },
        {
            "price": "26.95",
            "date": "Dec 2001",
            "symbol": "MSFT"
        },
        {
            "price": "25.92",
            "date": "Jan 2002",
            "symbol": "MSFT"
        },
        {
            "price": "23.73",
            "date": "Feb 2002",
            "symbol": "MSFT"
        },
        {
            "price": "24.53",
            "date": "Mar 2002",
            "symbol": "MSFT"
        },
        {
            "price": "21.26",
            "date": "Apr 2002",
            "symbol": "MSFT"
        },
        {
            "price": "20.71",
            "date": "May 2002",
            "symbol": "MSFT"
        },
        {
            "price": "22.25",
            "date": "Jun 2002",
            "symbol": "MSFT"
        },
        {
            "price": "19.52",
            "date": "Jul 2002",
            "symbol": "MSFT"
        },
        {
            "price": "19.97",
            "date": "Aug 2002",
            "symbol": "MSFT"
        },
        {
            "price": "17.79",
            "date": "Sep 2002",
            "symbol": "MSFT"
        },
        {
            "price": "21.75",
            "date": "Oct 2002",
            "symbol": "MSFT"
        },
        {
            "price": "23.46",
            "date": "Nov 2002",
            "symbol": "MSFT"
        },
        {
            "price": "21.03",
            "date": "Dec 2002",
            "symbol": "MSFT"
        },
        {
            "price": "19.31",
            "date": "Jan 2003",
            "symbol": "MSFT"
        },
        {
            "price": "19.34",
            "date": "Feb 2003",
            "symbol": "MSFT"
        },
        {
            "price": "19.76",
            "date": "Mar 2003",
            "symbol": "MSFT"
        },
        {
            "price": "20.87",
            "date": "Apr 2003",
            "symbol": "MSFT"
        },
        {
            "price": "20.09",
            "date": "May 2003",
            "symbol": "MSFT"
        },
        {
            "price": "20.93",
            "date": "Jun 2003",
            "symbol": "MSFT"
        },
        {
            "price": "21.56",
            "date": "Jul 2003",
            "symbol": "MSFT"
        },
        {
            "price": "21.65",
            "date": "Aug 2003",
            "symbol": "MSFT"
        },
        {
            "price": "22.69",
            "date": "Sep 2003",
            "symbol": "MSFT"
        },
        {
            "price": "21.45",
            "date": "Oct 2003",
            "symbol": "MSFT"
        },
        {
            "price": "21.1",
            "date": "Nov 2003",
            "symbol": "MSFT"
        },
        {
            "price": "22.46",
            "date": "Dec 2003",
            "symbol": "MSFT"
        },
        {
            "price": "22.69",
            "date": "Jan 2004",
            "symbol": "MSFT"
        },
        {
            "price": "21.77",
            "date": "Feb 2004",
            "symbol": "MSFT"
        },
        {
            "price": "20.46",
            "date": "Mar 2004",
            "symbol": "MSFT"
        },
        {
            "price": "21.45",
            "date": "Apr 2004",
            "symbol": "MSFT"
        },
        {
            "price": "21.53",
            "date": "May 2004",
            "symbol": "MSFT"
        },
        {
            "price": "23.44",
            "date": "Jun 2004",
            "symbol": "MSFT"
        },
        {
            "price": "23.38",
            "date": "Jul 2004",
            "symbol": "MSFT"
        },
        {
            "price": "22.47",
            "date": "Aug 2004",
            "symbol": "MSFT"
        },
        {
            "price": "22.76",
            "date": "Sep 2004",
            "symbol": "MSFT"
        },
        {
            "price": "23.02",
            "date": "Oct 2004",
            "symbol": "MSFT"
        },
        {
            "price": "24.6",
            "date": "Nov 2004",
            "symbol": "MSFT"
        },
        {
            "price": "24.52",
            "date": "Dec 2004",
            "symbol": "MSFT"
        },
        {
            "price": "24.11",
            "date": "Jan 2005",
            "symbol": "MSFT"
        },
        {
            "price": "23.15",
            "date": "Feb 2005",
            "symbol": "MSFT"
        },
        {
            "price": "22.24",
            "date": "Mar 2005",
            "symbol": "MSFT"
        },
        {
            "price": "23.28",
            "date": "Apr 2005",
            "symbol": "MSFT"
        },
        {
            "price": "23.82",
            "date": "May 2005",
            "symbol": "MSFT"
        },
        {
            "price": "22.93",
            "date": "Jun 2005",
            "symbol": "MSFT"
        },
        {
            "price": "23.64",
            "date": "Jul 2005",
            "symbol": "MSFT"
        },
        {
            "price": "25.35",
            "date": "Aug 2005",
            "symbol": "MSFT"
        },
        {
            "price": "23.83",
            "date": "Sep 2005",
            "symbol": "MSFT"
        },
        {
            "price": "23.8",
            "date": "Oct 2005",
            "symbol": "MSFT"
        },
        {
            "price": "25.71",
            "date": "Nov 2005",
            "symbol": "MSFT"
        },
        {
            "price": "24.29",
            "date": "Dec 2005",
            "symbol": "MSFT"
        },
        {
            "price": "26.14",
            "date": "Jan 2006",
            "symbol": "MSFT"
        },
        {
            "price": "25.04",
            "date": "Feb 2006",
            "symbol": "MSFT"
        },
        {
            "price": "25.36",
            "date": "Mar 2006",
            "symbol": "MSFT"
        },
        {
            "price": "22.5",
            "date": "Apr 2006",
            "symbol": "MSFT"
        },
        {
            "price": "21.19",
            "date": "May 2006",
            "symbol": "MSFT"
        },
        {
            "price": "21.8",
            "date": "Jun 2006",
            "symbol": "MSFT"
        },
        {
            "price": "22.51",
            "date": "Jul 2006",
            "symbol": "MSFT"
        },
        {
            "price": "24.13",
            "date": "Aug 2006",
            "symbol": "MSFT"
        },
        {
            "price": "25.68",
            "date": "Sep 2006",
            "symbol": "MSFT"
        },
        {
            "price": "26.96",
            "date": "Oct 2006",
            "symbol": "MSFT"
        },
        {
            "price": "27.66",
            "date": "Nov 2006",
            "symbol": "MSFT"
        },
        {
            "price": "28.13",
            "date": "Dec 2006",
            "symbol": "MSFT"
        },
        {
            "price": "29.07",
            "date": "Jan 2007",
            "symbol": "MSFT"
        },
        {
            "price": "26.63",
            "date": "Feb 2007",
            "symbol": "MSFT"
        },
        {
            "price": "26.35",
            "date": "Mar 2007",
            "symbol": "MSFT"
        },
        {
            "price": "28.3",
            "date": "Apr 2007",
            "symbol": "MSFT"
        },
        {
            "price": "29.11",
            "date": "May 2007",
            "symbol": "MSFT"
        },
        {
            "price": "27.95",
            "date": "Jun 2007",
            "symbol": "MSFT"
        },
        {
            "price": "27.5",
            "date": "Jul 2007",
            "symbol": "MSFT"
        },
        {
            "price": "27.34",
            "date": "Aug 2007",
            "symbol": "MSFT"
        },
        {
            "price": "28.04",
            "date": "Sep 2007",
            "symbol": "MSFT"
        },
        {
            "price": "35.03",
            "date": "Oct 2007",
            "symbol": "MSFT"
        },
        {
            "price": "32.09",
            "date": "Nov 2007",
            "symbol": "MSFT"
        },
        {
            "price": "34",
            "date": "Dec 2007",
            "symbol": "MSFT"
        },
        {
            "price": "31.13",
            "date": "Jan 2008",
            "symbol": "MSFT"
        },
        {
            "price": "26.07",
            "date": "Feb 2008",
            "symbol": "MSFT"
        },
        {
            "price": "27.21",
            "date": "Mar 2008",
            "symbol": "MSFT"
        },
        {
            "price": "27.34",
            "date": "Apr 2008",
            "symbol": "MSFT"
        },
        {
            "price": "27.25",
            "date": "May 2008",
            "symbol": "MSFT"
        },
        {
            "price": "26.47",
            "date": "Jun 2008",
            "symbol": "MSFT"
        },
        {
            "price": "24.75",
            "date": "Jul 2008",
            "symbol": "MSFT"
        },
        {
            "price": "26.36",
            "date": "Aug 2008",
            "symbol": "MSFT"
        },
        {
            "price": "25.78",
            "date": "Sep 2008",
            "symbol": "MSFT"
        },
        {
            "price": "21.57",
            "date": "Oct 2008",
            "symbol": "MSFT"
        },
        {
            "price": "19.66",
            "date": "Nov 2008",
            "symbol": "MSFT"
        },
        {
            "price": "18.91",
            "date": "Dec 2008",
            "symbol": "MSFT"
        },
        {
            "price": "16.63",
            "date": "Jan 2009",
            "symbol": "MSFT"
        },
        {
            "price": "15.81",
            "date": "Feb 2009",
            "symbol": "MSFT"
        },
        {
            "price": "17.99",
            "date": "Mar 2009",
            "symbol": "MSFT"
        },
        {
            "price": "19.84",
            "date": "Apr 2009",
            "symbol": "MSFT"
        },
        {
            "price": "20.59",
            "date": "May 2009",
            "symbol": "MSFT"
        },
        {
            "price": "23.42",
            "date": "Jun 2009",
            "symbol": "MSFT"
        },
        {
            "price": "23.18",
            "date": "Jul 2009",
            "symbol": "MSFT"
        },
        {
            "price": "24.43",
            "date": "Aug 2009",
            "symbol": "MSFT"
        },
        {
            "price": "25.49",
            "date": "Sep 2009",
            "symbol": "MSFT"
        },
        {
            "price": "27.48",
            "date": "Oct 2009",
            "symbol": "MSFT"
        },
        {
            "price": "29.27",
            "date": "Nov 2009",
            "symbol": "MSFT"
        },
        {
            "price": "30.34",
            "date": "Dec 2009",
            "symbol": "MSFT"
        },
        {
            "price": "28.05",
            "date": "Jan 2010",
            "symbol": "MSFT"
        },
        {
            "price": "28.67",
            "date": "Feb 2010",
            "symbol": "MSFT"
        },
        {
            "price": "28.8",
            "date": "Mar 2010",
            "symbol": "MSFT"
        }
    ],
    [
        {
            "price": "64.56",
            "date": "Jan 2000",
            "symbol": "AMZN"
        },
        {
            "price": "68.87",
            "date": "Feb 2000",
            "symbol": "AMZN"
        },
        {
            "price": "67",
            "date": "Mar 2000",
            "symbol": "AMZN"
        },
        {
            "price": "55.19",
            "date": "Apr 2000",
            "symbol": "AMZN"
        },
        {
            "price": "48.31",
            "date": "May 2000",
            "symbol": "AMZN"
        },
        {
            "price": "36.31",
            "date": "Jun 2000",
            "symbol": "AMZN"
        },
        {
            "price": "30.12",
            "date": "Jul 2000",
            "symbol": "AMZN"
        },
        {
            "price": "41.5",
            "date": "Aug 2000",
            "symbol": "AMZN"
        },
        {
            "price": "38.44",
            "date": "Sep 2000",
            "symbol": "AMZN"
        },
        {
            "price": "36.62",
            "date": "Oct 2000",
            "symbol": "AMZN"
        },
        {
            "price": "24.69",
            "date": "Nov 2000",
            "symbol": "AMZN"
        },
        {
            "price": "15.56",
            "date": "Dec 2000",
            "symbol": "AMZN"
        },
        {
            "price": "17.31",
            "date": "Jan 2001",
            "symbol": "AMZN"
        },
        {
            "price": "10.19",
            "date": "Feb 2001",
            "symbol": "AMZN"
        },
        {
            "price": "10.23",
            "date": "Mar 2001",
            "symbol": "AMZN"
        },
        {
            "price": "15.78",
            "date": "Apr 2001",
            "symbol": "AMZN"
        },
        {
            "price": "16.69",
            "date": "May 2001",
            "symbol": "AMZN"
        },
        {
            "price": "14.15",
            "date": "Jun 2001",
            "symbol": "AMZN"
        },
        {
            "price": "12.49",
            "date": "Jul 2001",
            "symbol": "AMZN"
        },
        {
            "price": "8.94",
            "date": "Aug 2001",
            "symbol": "AMZN"
        },
        {
            "price": "5.97",
            "date": "Sep 2001",
            "symbol": "AMZN"
        },
        {
            "price": "6.98",
            "date": "Oct 2001",
            "symbol": "AMZN"
        },
        {
            "price": "11.32",
            "date": "Nov 2001",
            "symbol": "AMZN"
        },
        {
            "price": "10.82",
            "date": "Dec 2001",
            "symbol": "AMZN"
        },
        {
            "price": "14.19",
            "date": "Jan 2002",
            "symbol": "AMZN"
        },
        {
            "price": "14.1",
            "date": "Feb 2002",
            "symbol": "AMZN"
        },
        {
            "price": "14.3",
            "date": "Mar 2002",
            "symbol": "AMZN"
        },
        {
            "price": "16.69",
            "date": "Apr 2002",
            "symbol": "AMZN"
        },
        {
            "price": "18.23",
            "date": "May 2002",
            "symbol": "AMZN"
        },
        {
            "price": "16.25",
            "date": "Jun 2002",
            "symbol": "AMZN"
        },
        {
            "price": "14.45",
            "date": "Jul 2002",
            "symbol": "AMZN"
        },
        {
            "price": "14.94",
            "date": "Aug 2002",
            "symbol": "AMZN"
        },
        {
            "price": "15.93",
            "date": "Sep 2002",
            "symbol": "AMZN"
        },
        {
            "price": "19.36",
            "date": "Oct 2002",
            "symbol": "AMZN"
        },
        {
            "price": "23.35",
            "date": "Nov 2002",
            "symbol": "AMZN"
        },
        {
            "price": "18.89",
            "date": "Dec 2002",
            "symbol": "AMZN"
        },
        {
            "price": "21.85",
            "date": "Jan 2003",
            "symbol": "AMZN"
        },
        {
            "price": "22.01",
            "date": "Feb 2003",
            "symbol": "AMZN"
        },
        {
            "price": "26.03",
            "date": "Mar 2003",
            "symbol": "AMZN"
        },
        {
            "price": "28.69",
            "date": "Apr 2003",
            "symbol": "AMZN"
        },
        {
            "price": "35.89",
            "date": "May 2003",
            "symbol": "AMZN"
        },
        {
            "price": "36.32",
            "date": "Jun 2003",
            "symbol": "AMZN"
        },
        {
            "price": "41.64",
            "date": "Jul 2003",
            "symbol": "AMZN"
        },
        {
            "price": "46.32",
            "date": "Aug 2003",
            "symbol": "AMZN"
        },
        {
            "price": "48.43",
            "date": "Sep 2003",
            "symbol": "AMZN"
        },
        {
            "price": "54.43",
            "date": "Oct 2003",
            "symbol": "AMZN"
        },
        {
            "price": "53.97",
            "date": "Nov 2003",
            "symbol": "AMZN"
        },
        {
            "price": "52.62",
            "date": "Dec 2003",
            "symbol": "AMZN"
        },
        {
            "price": "50.4",
            "date": "Jan 2004",
            "symbol": "AMZN"
        },
        {
            "price": "43.01",
            "date": "Feb 2004",
            "symbol": "AMZN"
        },
        {
            "price": "43.28",
            "date": "Mar 2004",
            "symbol": "AMZN"
        },
        {
            "price": "43.6",
            "date": "Apr 2004",
            "symbol": "AMZN"
        },
        {
            "price": "48.5",
            "date": "May 2004",
            "symbol": "AMZN"
        },
        {
            "price": "54.4",
            "date": "Jun 2004",
            "symbol": "AMZN"
        },
        {
            "price": "38.92",
            "date": "Jul 2004",
            "symbol": "AMZN"
        },
        {
            "price": "38.14",
            "date": "Aug 2004",
            "symbol": "AMZN"
        },
        {
            "price": "40.86",
            "date": "Sep 2004",
            "symbol": "AMZN"
        },
        {
            "price": "34.13",
            "date": "Oct 2004",
            "symbol": "AMZN"
        },
        {
            "price": "39.68",
            "date": "Nov 2004",
            "symbol": "AMZN"
        },
        {
            "price": "44.29",
            "date": "Dec 2004",
            "symbol": "AMZN"
        },
        {
            "price": "43.22",
            "date": "Jan 2005",
            "symbol": "AMZN"
        },
        {
            "price": "33.22",
            "date": "Apr 2005",
            "symbol": "AMZN"
        },
        {
            "price": "35.51",
            "date": "May 2005",
            "symbol": "AMZN"
        },
        {
            "price": "33.09",
            "date": "Jun 2005",
            "symbol": "AMZN"
        },
        {
            "price": "45.15",
            "date": "Jul 2005",
            "symbol": "AMZN"
        },
        {
            "price": "42.7",
            "date": "Aug 2005",
            "symbol": "AMZN"
        },
        {
            "price": "45.3",
            "date": "Sep 2005",
            "symbol": "AMZN"
        },
        {
            "price": "39.86",
            "date": "Oct 2005",
            "symbol": "AMZN"
        },
        {
            "price": "48.46",
            "date": "Nov 2005",
            "symbol": "AMZN"
        },
        {
            "price": "47.15",
            "date": "Dec 2005",
            "symbol": "AMZN"
        },
        {
            "price": "44.82",
            "date": "Jan 2006",
            "symbol": "AMZN"
        },
        {
            "price": "37.44",
            "date": "Feb 2006",
            "symbol": "AMZN"
        },
        {
            "price": "36.53",
            "date": "Mar 2006",
            "symbol": "AMZN"
        },
        {
            "price": "35.21",
            "date": "Apr 2006",
            "symbol": "AMZN"
        },
        {
            "price": "34.61",
            "date": "May 2006",
            "symbol": "AMZN"
        },
        {
            "price": "38.68",
            "date": "Jun 2006",
            "symbol": "AMZN"
        },
        {
            "price": "26.89",
            "date": "Jul 2006",
            "symbol": "AMZN"
        },
        {
            "price": "30.83",
            "date": "Aug 2006",
            "symbol": "AMZN"
        },
        {
            "price": "32.12",
            "date": "Sep 2006",
            "symbol": "AMZN"
        },
        {
            "price": "38.09",
            "date": "Oct 2006",
            "symbol": "AMZN"
        },
        {
            "price": "40.34",
            "date": "Nov 2006",
            "symbol": "AMZN"
        },
        {
            "price": "39.46",
            "date": "Dec 2006",
            "symbol": "AMZN"
        },
        {
            "price": "37.67",
            "date": "Jan 2007",
            "symbol": "AMZN"
        },
        {
            "price": "39.14",
            "date": "Feb 2007",
            "symbol": "AMZN"
        },
        {
            "price": "39.79",
            "date": "Mar 2007",
            "symbol": "AMZN"
        },
        {
            "price": "61.33",
            "date": "Apr 2007",
            "symbol": "AMZN"
        },
        {
            "price": "69.14",
            "date": "May 2007",
            "symbol": "AMZN"
        },
        {
            "price": "68.41",
            "date": "Jun 2007",
            "symbol": "AMZN"
        },
        {
            "price": "78.54",
            "date": "Jul 2007",
            "symbol": "AMZN"
        },
        {
            "price": "79.91",
            "date": "Aug 2007",
            "symbol": "AMZN"
        },
        {
            "price": "93.15",
            "date": "Sep 2007",
            "symbol": "AMZN"
        },
        {
            "price": "89.15",
            "date": "Oct 2007",
            "symbol": "AMZN"
        },
        {
            "price": "90.56",
            "date": "Nov 2007",
            "symbol": "AMZN"
        },
        {
            "price": "92.64",
            "date": "Dec 2007",
            "symbol": "AMZN"
        },
        {
            "price": "77.7",
            "date": "Jan 2008",
            "symbol": "AMZN"
        },
        {
            "price": "64.47",
            "date": "Feb 2008",
            "symbol": "AMZN"
        },
        {
            "price": "71.3",
            "date": "Mar 2008",
            "symbol": "AMZN"
        },
        {
            "price": "78.63",
            "date": "Apr 2008",
            "symbol": "AMZN"
        },
        {
            "price": "81.62",
            "date": "May 2008",
            "symbol": "AMZN"
        },
        {
            "price": "73.33",
            "date": "Jun 2008",
            "symbol": "AMZN"
        },
        {
            "price": "76.34",
            "date": "Jul 2008",
            "symbol": "AMZN"
        },
        {
            "price": "80.81",
            "date": "Aug 2008",
            "symbol": "AMZN"
        },
        {
            "price": "72.76",
            "date": "Sep 2008",
            "symbol": "AMZN"
        },
        {
            "price": "57.24",
            "date": "Oct 2008",
            "symbol": "AMZN"
        },
        {
            "price": "42.7",
            "date": "Nov 2008",
            "symbol": "AMZN"
        },
        {
            "price": "51.28",
            "date": "Dec 2008",
            "symbol": "AMZN"
        },
        {
            "price": "58.82",
            "date": "Jan 2009",
            "symbol": "AMZN"
        },
        {
            "price": "64.79",
            "date": "Feb 2009",
            "symbol": "AMZN"
        },
        {
            "price": "73.44",
            "date": "Mar 2009",
            "symbol": "AMZN"
        },
        {
            "price": "80.52",
            "date": "Apr 2009",
            "symbol": "AMZN"
        },
        {
            "price": "77.99",
            "date": "May 2009",
            "symbol": "AMZN"
        },
        {
            "price": "83.66",
            "date": "Jun 2009",
            "symbol": "AMZN"
        },
        {
            "price": "85.76",
            "date": "Jul 2009",
            "symbol": "AMZN"
        },
        {
            "price": "81.19",
            "date": "Aug 2009",
            "symbol": "AMZN"
        },
        {
            "price": "93.36",
            "date": "Sep 2009",
            "symbol": "AMZN"
        },
        {
            "price": "118.81",
            "date": "Oct 2009",
            "symbol": "AMZN"
        },
        {
            "price": "135.91",
            "date": "Nov 2009",
            "symbol": "AMZN"
        },
        {
            "price": "134.52",
            "date": "Dec 2009",
            "symbol": "AMZN"
        },
        {
            "price": "125.41",
            "date": "Jan 2010",
            "symbol": "AMZN"
        },
        {
            "price": "118.4",
            "date": "Feb 2010",
            "symbol": "AMZN"
        },
        {
            "price": "128.82",
            "date": "Mar 2010",
            "symbol": "AMZN"
        }
    ],
    [
        {
            "price": "100.52",
            "date": "Jan 2000",
            "symbol": "IBM"
        },
        {
            "price": "92.11",
            "date": "Feb 2000",
            "symbol": "IBM"
        },
        {
            "price": "106.11",
            "date": "Mar 2000",
            "symbol": "IBM"
        },
        {
            "price": "99.95",
            "date": "Apr 2000",
            "symbol": "IBM"
        },
        {
            "price": "96.31",
            "date": "May 2000",
            "symbol": "IBM"
        },
        {
            "price": "98.33",
            "date": "Jun 2000",
            "symbol": "IBM"
        },
        {
            "price": "100.74",
            "date": "Jul 2000",
            "symbol": "IBM"
        },
        {
            "price": "118.62",
            "date": "Aug 2000",
            "symbol": "IBM"
        },
        {
            "price": "101.19",
            "date": "Sep 2000",
            "symbol": "IBM"
        },
        {
            "price": "88.5",
            "date": "Oct 2000",
            "symbol": "IBM"
        },
        {
            "price": "84.12",
            "date": "Nov 2000",
            "symbol": "IBM"
        },
        {
            "price": "76.47",
            "date": "Dec 2000",
            "symbol": "IBM"
        },
        {
            "price": "100.76",
            "date": "Jan 2001",
            "symbol": "IBM"
        },
        {
            "price": "89.98",
            "date": "Feb 2001",
            "symbol": "IBM"
        },
        {
            "price": "86.63",
            "date": "Mar 2001",
            "symbol": "IBM"
        },
        {
            "price": "103.7",
            "date": "Apr 2001",
            "symbol": "IBM"
        },
        {
            "price": "100.82",
            "date": "May 2001",
            "symbol": "IBM"
        },
        {
            "price": "102.35",
            "date": "Jun 2001",
            "symbol": "IBM"
        },
        {
            "price": "94.87",
            "date": "Jul 2001",
            "symbol": "IBM"
        },
        {
            "price": "90.25",
            "date": "Aug 2001",
            "symbol": "IBM"
        },
        {
            "price": "82.82",
            "date": "Sep 2001",
            "symbol": "IBM"
        },
        {
            "price": "97.58",
            "date": "Oct 2001",
            "symbol": "IBM"
        },
        {
            "price": "104.5",
            "date": "Nov 2001",
            "symbol": "IBM"
        },
        {
            "price": "109.36",
            "date": "Dec 2001",
            "symbol": "IBM"
        },
        {
            "price": "97.54",
            "date": "Jan 2002",
            "symbol": "IBM"
        },
        {
            "price": "88.82",
            "date": "Feb 2002",
            "symbol": "IBM"
        },
        {
            "price": "94.15",
            "date": "Mar 2002",
            "symbol": "IBM"
        },
        {
            "price": "75.82",
            "date": "Apr 2002",
            "symbol": "IBM"
        },
        {
            "price": "72.97",
            "date": "May 2002",
            "symbol": "IBM"
        },
        {
            "price": "65.31",
            "date": "Jun 2002",
            "symbol": "IBM"
        },
        {
            "price": "63.86",
            "date": "Jul 2002",
            "symbol": "IBM"
        },
        {
            "price": "68.52",
            "date": "Aug 2002",
            "symbol": "IBM"
        },
        {
            "price": "53.01",
            "date": "Sep 2002",
            "symbol": "IBM"
        },
        {
            "price": "71.76",
            "date": "Oct 2002",
            "symbol": "IBM"
        },
        {
            "price": "79.16",
            "date": "Nov 2002",
            "symbol": "IBM"
        },
        {
            "price": "70.58",
            "date": "Dec 2002",
            "symbol": "IBM"
        },
        {
            "price": "71.22",
            "date": "Jan 2003",
            "symbol": "IBM"
        },
        {
            "price": "71.13",
            "date": "Feb 2003",
            "symbol": "IBM"
        },
        {
            "price": "71.57",
            "date": "Mar 2003",
            "symbol": "IBM"
        },
        {
            "price": "77.47",
            "date": "Apr 2003",
            "symbol": "IBM"
        },
        {
            "price": "80.48",
            "date": "May 2003",
            "symbol": "IBM"
        },
        {
            "price": "75.42",
            "date": "Jun 2003",
            "symbol": "IBM"
        },
        {
            "price": "74.28",
            "date": "Jul 2003",
            "symbol": "IBM"
        },
        {
            "price": "75.12",
            "date": "Aug 2003",
            "symbol": "IBM"
        },
        {
            "price": "80.91",
            "date": "Sep 2003",
            "symbol": "IBM"
        },
        {
            "price": "81.96",
            "date": "Oct 2003",
            "symbol": "IBM"
        },
        {
            "price": "83.08",
            "date": "Nov 2003",
            "symbol": "IBM"
        },
        {
            "price": "85.05",
            "date": "Dec 2003",
            "symbol": "IBM"
        },
        {
            "price": "91.06",
            "date": "Jan 2004",
            "symbol": "IBM"
        },
        {
            "price": "88.7",
            "date": "Feb 2004",
            "symbol": "IBM"
        },
        {
            "price": "84.41",
            "date": "Mar 2004",
            "symbol": "IBM"
        },
        {
            "price": "81.04",
            "date": "Apr 2004",
            "symbol": "IBM"
        },
        {
            "price": "81.59",
            "date": "May 2004",
            "symbol": "IBM"
        },
        {
            "price": "81.19",
            "date": "Jun 2004",
            "symbol": "IBM"
        },
        {
            "price": "80.19",
            "date": "Jul 2004",
            "symbol": "IBM"
        },
        {
            "price": "78.17",
            "date": "Aug 2004",
            "symbol": "IBM"
        },
        {
            "price": "79.13",
            "date": "Sep 2004",
            "symbol": "IBM"
        },
        {
            "price": "82.84",
            "date": "Oct 2004",
            "symbol": "IBM"
        },
        {
            "price": "87.15",
            "date": "Nov 2004",
            "symbol": "IBM"
        },
        {
            "price": "91.16",
            "date": "Dec 2004",
            "symbol": "IBM"
        },
        {
            "price": "86.39",
            "date": "Jan 2005",
            "symbol": "IBM"
        },
        {
            "price": "85.78",
            "date": "Feb 2005",
            "symbol": "IBM"
        },
        {
            "price": "84.66",
            "date": "Mar 2005",
            "symbol": "IBM"
        },
        {
            "price": "70.77",
            "date": "Apr 2005",
            "symbol": "IBM"
        },
        {
            "price": "70.18",
            "date": "May 2005",
            "symbol": "IBM"
        },
        {
            "price": "68.93",
            "date": "Jun 2005",
            "symbol": "IBM"
        },
        {
            "price": "77.53",
            "date": "Jul 2005",
            "symbol": "IBM"
        },
        {
            "price": "75.07",
            "date": "Aug 2005",
            "symbol": "IBM"
        },
        {
            "price": "74.7",
            "date": "Sep 2005",
            "symbol": "IBM"
        },
        {
            "price": "76.25",
            "date": "Oct 2005",
            "symbol": "IBM"
        },
        {
            "price": "82.98",
            "date": "Nov 2005",
            "symbol": "IBM"
        },
        {
            "price": "76.73",
            "date": "Dec 2005",
            "symbol": "IBM"
        },
        {
            "price": "75.89",
            "date": "Jan 2006",
            "symbol": "IBM"
        },
        {
            "price": "75.09",
            "date": "Feb 2006",
            "symbol": "IBM"
        },
        {
            "price": "77.17",
            "date": "Mar 2006",
            "symbol": "IBM"
        },
        {
            "price": "77.05",
            "date": "Apr 2006",
            "symbol": "IBM"
        },
        {
            "price": "75.04",
            "date": "May 2006",
            "symbol": "IBM"
        },
        {
            "price": "72.15",
            "date": "Jun 2006",
            "symbol": "IBM"
        },
        {
            "price": "72.7",
            "date": "Jul 2006",
            "symbol": "IBM"
        },
        {
            "price": "76.35",
            "date": "Aug 2006",
            "symbol": "IBM"
        },
        {
            "price": "77.26",
            "date": "Sep 2006",
            "symbol": "IBM"
        },
        {
            "price": "87.06",
            "date": "Oct 2006",
            "symbol": "IBM"
        },
        {
            "price": "86.95",
            "date": "Nov 2006",
            "symbol": "IBM"
        },
        {
            "price": "91.9",
            "date": "Dec 2006",
            "symbol": "IBM"
        },
        {
            "price": "93.79",
            "date": "Jan 2007",
            "symbol": "IBM"
        },
        {
            "price": "88.18",
            "date": "Feb 2007",
            "symbol": "IBM"
        },
        {
            "price": "89.44",
            "date": "Mar 2007",
            "symbol": "IBM"
        },
        {
            "price": "96.98",
            "date": "Apr 2007",
            "symbol": "IBM"
        },
        {
            "price": "101.54",
            "date": "May 2007",
            "symbol": "IBM"
        },
        {
            "price": "100.25",
            "date": "Jun 2007",
            "symbol": "IBM"
        },
        {
            "price": "105.4",
            "date": "Jul 2007",
            "symbol": "IBM"
        },
        {
            "price": "111.54",
            "date": "Aug 2007",
            "symbol": "IBM"
        },
        {
            "price": "112.6",
            "date": "Sep 2007",
            "symbol": "IBM"
        },
        {
            "price": "111",
            "date": "Oct 2007",
            "symbol": "IBM"
        },
        {
            "price": "100.9",
            "date": "Nov 2007",
            "symbol": "IBM"
        },
        {
            "price": "103.7",
            "date": "Dec 2007",
            "symbol": "IBM"
        },
        {
            "price": "102.75",
            "date": "Jan 2008",
            "symbol": "IBM"
        },
        {
            "price": "109.64",
            "date": "Feb 2008",
            "symbol": "IBM"
        },
        {
            "price": "110.87",
            "date": "Mar 2008",
            "symbol": "IBM"
        },
        {
            "price": "116.23",
            "date": "Apr 2008",
            "symbol": "IBM"
        },
        {
            "price": "125.14",
            "date": "May 2008",
            "symbol": "IBM"
        },
        {
            "price": "114.6",
            "date": "Jun 2008",
            "symbol": "IBM"
        },
        {
            "price": "123.74",
            "date": "Jul 2008",
            "symbol": "IBM"
        },
        {
            "price": "118.16",
            "date": "Aug 2008",
            "symbol": "IBM"
        },
        {
            "price": "113.53",
            "date": "Sep 2008",
            "symbol": "IBM"
        },
        {
            "price": "90.24",
            "date": "Oct 2008",
            "symbol": "IBM"
        },
        {
            "price": "79.65",
            "date": "Nov 2008",
            "symbol": "IBM"
        },
        {
            "price": "82.15",
            "date": "Dec 2008",
            "symbol": "IBM"
        },
        {
            "price": "89.46",
            "date": "Jan 2009",
            "symbol": "IBM"
        },
        {
            "price": "90.32",
            "date": "Feb 2009",
            "symbol": "IBM"
        },
        {
            "price": "95.09",
            "date": "Mar 2009",
            "symbol": "IBM"
        },
        {
            "price": "101.29",
            "date": "Apr 2009",
            "symbol": "IBM"
        },
        {
            "price": "104.85",
            "date": "May 2009",
            "symbol": "IBM"
        },
        {
            "price": "103.01",
            "date": "Jun 2009",
            "symbol": "IBM"
        },
        {
            "price": "116.34",
            "date": "Jul 2009",
            "symbol": "IBM"
        },
        {
            "price": "117",
            "date": "Aug 2009",
            "symbol": "IBM"
        },
        {
            "price": "118.55",
            "date": "Sep 2009",
            "symbol": "IBM"
        },
        {
            "price": "119.54",
            "date": "Oct 2009",
            "symbol": "IBM"
        },
        {
            "price": "125.79",
            "date": "Nov 2009",
            "symbol": "IBM"
        },
        {
            "price": "130.32",
            "date": "Dec 2009",
            "symbol": "IBM"
        },
        {
            "price": "121.85",
            "date": "Jan 2010",
            "symbol": "IBM"
        },
        {
            "price": "127.16",
            "date": "Feb 2010",
            "symbol": "IBM"
        },
        {
            "price": "125.55",
            "date": "Mar 2010",
            "symbol": "IBM"
        }
    ]

]
