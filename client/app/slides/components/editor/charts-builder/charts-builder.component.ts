import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import * as shape from 'd3-shape';
import * as dsv from 'd3-dsv';
import { nest } from 'd3-collection';
import * as babyparse from 'babyparse';
import * as _ from 'lodash';

import { chartTypes } from './chartTypes';
import { gapminder } from './data';

const defaultOptions = {
  view: [900, 600],
  colorScheme: colorSets.find(s => s.name === 'cool'),
  schemeType: 'ordinal',
  showLegend: true,
  legendTitle: 'Legend',
  gradient: false,
  showXAxis: true,
  showYAxis: true,
  showXAxisLabel: true,
  showYAxisLabel: true,
  yAxisLabel: '',
  xAxisLabel: '',
  autoScale: true,
  showGridLines: true,
  rangeFillOpacity: 0.5,
  roundDomains: false,
  tooltipDisabled: false,
  showSeriesOnHover: true,
  curve: shape.curveLinear,
  curveClosed: shape.curveCardinalClosed
};

const curves = {
  'Basis': shape.curveBasis,
  'Basis Closed': shape.curveBasisClosed,
  'Bundle': shape.curveBundle.beta(1),
  'Cardinal': shape.curveCardinal,
  'Cardinal Closed': shape.curveCardinalClosed,
  'Catmull Rom': shape.curveCatmullRom,
  'Catmull Rom Closed': shape.curveCatmullRomClosed,
  'Linear': shape.curveLinear,
  'Linear Closed': shape.curveLinearClosed,
  'Monotone X': shape.curveMonotoneX,
  'Monotone Y': shape.curveMonotoneY,
  'Natural': shape.curveNatural,
  'Step': shape.curveStep,
  'Step After': shape.curveStepAfter,
  'Step Before': shape.curveStepBefore,
  'default': shape.curveLinear
};


@Component({
  selector: 'app-charts-builder',
  templateUrl: './charts-builder.component.html',
  styleUrls: ['./charts-builder.component.scss']
})
export class ChartsBuilderComponent implements OnInit {
  @Input() inputData: any[];
  @Input() inputOptions: any;

  chartTypes = chartTypes;

  config = {
    lineNumbers: true,
    theme: 'dracula',
    mode: "htmlmixed"
  };

  formatTable: boolean = false;
  data: any[];
  rawData: any[];
  headerValues: any[];
  errors: any[];
  chartType: any;
  theme: string;
  dataDims: string[][];
  chartOptions: any;
  @Output() configGraph = new EventEmitter();

  // charts = [{
  //   name : "bar chart",
  //   description :'A bar chart or bar graph is a chart or graph that presents grouped data with rectangular bars with heights proportional to the values that they represent.',
  //   categorie : "Comparison",
  //   image :"assets/img-graph/bar-chart.png"
  // },
  //   {
  //     name : "Pie chart",
  //     description :'A pie chart (or a circle chart) is a circular statistical graphic which is divided into slices to illustrate numerical proportion.',
  //     categorie : "Comparison",
  //     image :"assets/img-graph/pie-chart.png"
  //   },
  //   {
  //     name : "Hierarchical Edge Bundling",
  //     description :'Show dependencies between classes in a software class hierarchy. Dependencies are bundled according to the parent packages',
  //     categorie : "hierarchy",
  //     image :"assets/img-graph/HierarchicalEdgeBundling-chart.png"
  //   },
  //   {
  //     name : "Line chart",
  //     description :'Is an interactive line chart that can be configured for multiple axes. ' +
  //     'The multi-axis line chart is a special type of chart that allows multiple y-axes to be rendered in the same chart. ' +
  //     'The advantage of using a multi-axis line chart is that you can plot multiple data sets with different types of units and different scale ranges  on the same chart.',
  //     categorie : "Comparison",
  //     image :"assets/img-graph/line-chart.png"
  //   },
  //   {
  //     name : "Zoomable sunburst ",
  //     description :'A sunburst is similar to the treemap, except it uses a radial layout. ' +
  //     'The root node of the tree is at the center, ' +
  //     'with leaves on the circumference. The area (or angle, depending on implementation) of each arc corresponds to its value.',
  //     categorie : "Hierarchy",
  //     image :"assets/img-graph/sunburst-chart.gif"
  //   },
  //   {
  //     name : "Treemap chart",
  //     description :'A space filling visualization of data hierarchies and proportion between elements.' +
  //     'The different hierarchical levels create visual clusters through the subdivision into rectangles proportionally to each element\'s value.' +
  //     ' Treemaps are useful to represent the different proportion of nested hierarchical data structures.',
  //     categorie : "Hierarchy",
  //     image :"assets/img-graph/treempa-chart.png"
  //   },
  //   {
  //     name : "Adevenced pie chart",
  //     description :'Adevenced pie chart is similar to the pie chart, with more details showing on the right of the pie',
  //     categorie : "Comparison",
  //     image :"assets/img-graph/advencedPie-chart.png"
  //   },
  //   {
  //     name : "Dendogram chart",
  //     description :'Dendrograms are tree-like diagrams used to represent the distribution of a hierarchical clustering.' +
  //     ' The different depth levels represented by each node are visualized on the horizontal axes and it is useful to visualize a non-weighted hierarchy.',
  //     categorie : "Hierarchy",
  //     image :"assets/img-graph/dendogram.png"
  //   },
  //   {
  //     name : "Force Directed graph",
  //     description :'Nested circles allow to represent hierarchies and compare values.' +
  //     ' This visualization is particularly effective to show the proportion between elements through their areas and their position inside a hierarchical structure. ',
  //     categorie : "Hierarchy",
  //     image :"assets/img-graph/forceDirectedGraph.png"
  //   },
  //   {
  //     name : "Gauge chart",
  //     description :'Gauge charts, also known as dial charts or speedometer charts, use needles to show information as a reading on a dial.' +
  //     'This chart type is often used in executive dashboard reports to show key business indicators.' +
  //     'Gauge charts are useful for comparing values between a small number of variables either by using multiple needles on the same gauge or by using multiple gauges.',
  //     categorie : "Comparison",
  //     image :"assets/img-graph/gauge-chart.png"
  //   }];
  _dataText: string;
  get dataText() {
    return this._dataText || ' ';
  }

  set dataText(value) {
    this.updateData(value);
  }

  get hasValidData() {
    return this._dataText.length > 0 && this.errors.length === 0;
  }

  get hasChartSelected() {
    return this.hasValidData && this.chartType && this.chartType.name;
  }

  get hasValidDimensions() {
    return this.hasChartSelected &&
      !this.chartType.dimLabels.some((l, i) => l ? !(this.dataDims[i] && this.dataDims[i].length > 0)  : false);
  }

  editorConfig = {
    lineNumbers: true,
    theme: 'white',
    mode: {
      name: 'json'
    }
  };

  allowDropFunction(size: number, dimIndex: number): any {
        return (dragData: any) => this.dataDims[dimIndex] == null || this.dataDims[dimIndex].length < size;
  }

  addTobox1Items(dimIndex: number, $event: any) {
    if(this.dataDims[dimIndex] == null)
      this.dataDims[dimIndex] =[];
    this.dataDims[dimIndex].push($event.dragData);
    this.processData();
  }

  removeItem(dimIndex: number, item: string){
    if(this.dataDims[dimIndex] == null)
      return;
    _.remove(this.dataDims[dimIndex], col => col === item);
    this.processData();
  }

  ngOnInit() {
    if (this.inputData != null) {
      this.loadData()
    } else {
      this.clearAll();
    }
  }

  editData(updatedData){
    this._dataText = babyparse.unparse(updatedData);
    this.rawData = updatedData;
    this.processData();
  }
  changeFormat() {
    this.formatTable = !this.formatTable;
    console.log('formatTable: ', this.formatTable);
  }

  loadData() {
    this.headerValues = this.inputOptions.headerValues;
    this.dataDims = this.inputOptions.dataDims;
    this.data = [];
    this.chartType = this.chartTypes.find(chart => chart.name === this.inputOptions.chartType.name);

    console.log('this.headerValues: ', this.headerValues);
    this.errors = [];
    this._dataText = babyparse.unparse(this.inputData);
    this.rawData = this.inputData;
    this.chartOptions = { ...defaultOptions };

    this.processData();
  }

  useExample() {
    this.clear();
    this.dataText = gapminder;
  }

  clear() {
    this.headerValues = [];
    this.rawData = [];
    this.dataDims = [null, null, null, null];
    return this.data = [];
  }

  clearAll() {
    this.clear();
    this.dataText = '';
    this.chartType = null;
    this.theme = 'light';
    this.chartOptions = { ...defaultOptions };
  }

  processData() {
    if (!this.hasValidDimensions) {
      return;
    }
    this.data = this.chartType.convertData(this.dataDims, this.rawData);
    this.configGraph.emit({ data: this.rawData, chartOptions: { chartType: this.chartType, headerValues: this.headerValues, dataDims: this.dataDims, ...this.chartOptions } });
    return this.data;
  }

  updateData(value = this._dataText) {
    this._dataText = value;
    const parsed = babyparse.parse(this._dataText, {
      header: true,
      dynamicTyping: true
    });

    this.errors = parsed.errors;

    if (this.errors.length) {
      return this.clear();
    }

    this.rawData = parsed.data;

    const headerValues = parsed.meta.fields.map(d => ({
      name: d,
      type: typeof parsed.data[0][d]
    }));

    if (JSON.stringify(headerValues) !== JSON.stringify(this.headerValues)) {
      this.headerValues = headerValues.slice();
      this.dataDims = [null, null, null, null];
      this.data = [];
    } else {
      this.processData();
    }
  }
}
