import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as D3 from 'd3';
import * as _ from 'lodash';
import { Chart } from '../chart.class';

declare const d3: any;

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent extends Chart implements OnInit, OnChanges {

  @ViewChild('chart') private chartContainer: ElementRef;
  private data: Array<any> = [];
  private margin: any = { top: 50, bottom: 50, left: 100, right: 100 };
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private loaded = true;
  private chartOptions: any;

  constructor() {
    super();
  }

  ngOnInit() {
    this.chartOptions = { ...this.configInput };
    D3.select('#WordCloudComponent').remove();
    this.init();
  }

  ngOnChanges() {
    D3.select('#WordCloudComponent').remove();
    this.init();
  }

  /**
  * Process json Data to D3.js Bar chart format
  * @param dataDims :  string[] Selected Dimentions
  * @param rawData : array<Object> Json data
  */
  public static convertData(dataDims: string[], rawData: any) {
    const name$ = d => d[_.head(dataDims[0])];
    const value$ = d => d[_.head(dataDims[1])];

    function sum(d: any) {
      return {
        name: name$(_.head(d)),
        value: _.reduce(d, (total, el) => total + value$(el), 0),
      };
    }

    const data = _.chain(rawData)
      .groupBy(_.head(dataDims[0]))
      .map(sum)
      .value();

    const max =  _.maxBy(data, 'value');

    return _.chain(data)
      .map((d: any) => { return {name: d.name, value: 10 + (d.value / max.value) * 90 }; } )
      .value();
  }

  setData(data) {
    if (data.length === 0) return;
    this.data = data;
  }

  init() {
    if (this.configInput != null) {
      this.data = WordCloudComponent.convertData(this.chartOptions.dataDims, this.dataInput);
    } else {
      this.data = this.dataInput;
    }

    this.drawChart();
    this.load();
  }

  /**
 * Draw function for D3.js Bar chart
 */
  drawChart() {

    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const size = [_.min([50 * this.data.length,  this.width]),  _.min([50 * this.data.length,  this.height])];
    console.log(size);

    const fill = D3.scaleOrdinal(D3.schemeCategory20);

    // Construct the word cloud's SVG element
    const svg = D3.select(element).append('svg')
      .attr('id', 'WordCloudComponent')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .append('g')
      .attr('transform', `translate(${element.offsetWidth / 2}, ${element.offsetHeight / 2})`);

    const cloud = svg.selectAll('g text')
      .data(this.data, function (d: any) { return d.name; });

    // Entering words
    cloud.enter()
      .append('text')
      .style('font-family', 'Impact')
      .style('fill', function (d: any, i: any) { return fill(i); })
      .attr('text-anchor', 'middle')
      .attr('font-size', 1)
      .text(function (d) { return d.name; });

    d3.layout.cloud().size(size)
      .words(this.data)
      .padding(5)
      .rotate(function () { return ~~(Math.random() * 2) * 90; })
      .font('Impact')
      .fontSize(function (d) { return d.value; })
      .on('end', draw)
      .start();

    // Draw the word cloud
    function draw(words) {
      const cloud = svg.selectAll('g text')
        .data(words, function (d: any) { return d.name; });

      // Entering and existing words
      cloud
        .transition()
        .duration(600)
        .style('font-size', function (d) { return d.value + 'px'; })
        .attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        })
        .style('fill-opacity', 1);
    }

  }
  // FIXME
  load() { }

  // FIXME
  ease() { }

}
