import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { nest } from 'd3-collection';
import { Chart } from '../chart.class';
import * as _ from 'lodash';

@Component({
    selector: 'app-dendogram',
    templateUrl: './dendogram.component.html',
    styleUrls: ['./dendogram.component.scss']
})
export class DendogramComponent extends Chart implements OnInit {
    @ViewChild('chart') private chartContainer: ElementRef;
    private element: any;
    private data: Array<any> = [];
    private width: number;
    private height: number;
    private curtain: any; //for animation
    private chartOptions: any;

    constructor() {
        super();
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

        const root = [{ id: dataDims[0], value: 0 }];

        const level0 = _.chain(rawData)
            .groupBy(dataDims[0])
            .flatMap(d => sum(d, 1, dataDims[0] + '.', name$))
            .value();

        function sum(d, depth, prefix, fetchId$) {

            let level = [];
            depth -= 1;
            if (depth >= 0) {
                level = _.chain(d)
                    .groupBy(dataDims[1])
                    .flatMap(d1 => sum(d1, depth, prefix + fetchId$(d[0]) + '.', name2$))
                    .value();
            }
            return level.concat({
                id: prefix + fetchId$(d[0]),
                value: _.reduce(d, (total, el) => total + value$(el), 0)
            })
        }

        return root.concat(level0);
    }


    init() {

        if (this.configInput != null)
            this.data = DendogramComponent.convertData(this.chartOptions.dataDims, this.dataInput);
        else
            this.data = this.dataInput;

        this.drawChart();
        this.load();
    }

    /**
     * Draw function for D3.js Bar chart
     */
    drawChart() {
        this.element = this.chartContainer.nativeElement;

        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;

        let svg = d3.select(this.element).append("svg");
        this.curtain = svg.style('opacity', 0);
        svg.attr("height", this.height)
            .attr("width", this.width);
        let g = svg.append("g").attr('transform', `translate(60,0)`);

        let tree = d3.cluster()
            .size([this.height, this.width - 200]);

        let stratify = d3.stratify()
            .parentId(d => { return d['id'].substring(0, d['id'].lastIndexOf(".")); });

        let root = stratify(this.data)
            .sort((a, b) => { return (a.height - b.height) || a.id.localeCompare(b.id); });

        tree(root);

        let link = g.selectAll(".link")
            .data(root.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d => {
                return "M" + d['y'] + "," + d['x']
                    + "C" + (d.parent['y'] + 100) + "," + d['x']
                    + " " + (d.parent['y'] + 100) + "," + d.parent['x']
                    + " " + d.parent['y'] + "," + d.parent['x'];
            });

        let node = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", d => { return "node" + (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", d => { return "translate(" + d['y'] + "," + d['x'] + ")"; })

        node.append("circle")
            .attr("r", 2.5);

        node.append("text")
            .attr("dy", 3)
            .attr("x", d => { return d.children ? -8 : 8; })
            .style("text-anchor", d => { return d.children ? "end" : "start"; })
            .text(d => { return d.id.substring(d.id.lastIndexOf(".") + 1); });
    }


    load() {
        this.curtain.transition()
            .duration(2000)
            .style('opacity', 1);
    }

    ease() {
        this.curtain.transition()
            .duration(1000)
            .style('opacity', 0);
    }

}
