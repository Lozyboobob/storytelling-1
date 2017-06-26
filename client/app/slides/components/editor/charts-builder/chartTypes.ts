
import { PieChartComponent, AdvancedPieChartComponent, BarChartComponent, ForceDirectedGraphComponent, GaugeChartComponent,
  HierarchicalEdgeBundlingComponent, PieGridChartComponent, LineChartComponent, DendogramComponent, NgGraphComponent,
  TreemapChartComponent, AreaChartComponent,
    BubbleChartComponent, ZoomableTreemapChartComponent
}  from "app/charts";


function createChartType({title, ...obj}) {
  return {
    title,
    name: titleToName(title),
    dimLabels: [{column: 'Group by', maxSize: 1} , {column: 'Name', maxSize: 1} ,{column: 'Value', maxSize: 1}],
    ...obj
  };

  function titleToName(s: string) {
    return s.toLowerCase().replace(/\ /g, '-');
  }
}


export const chartTypes = [
  createChartType({ title: 'Bar Chart', simpleData: true, cmpName: 'barChart', convertData: BarChartComponent.convertData ,dimLabels: [ {column: 'Name', maxSize: 1} , {column: 'Value', maxSize: 1} ],
      description :'A bar chart or bar graph is a chart or graph that presents grouped data with rectangular bars with heights proportional to the values that they represent.',
      categorie : "Comparison",
      image :"assets/img-graph/bar-chart.png"}),}),
  createChartType({ title: 'Pie Chart', simpleData: true, cmpName: 'pieChart', convertData: PieChartComponent.convertData ,dimLabels: [ {column: 'Name', maxSize: 1} , {column: 'Value', maxSize: 1} ],
      description :'A pie chart (or a circle chart) is a circular statistical graphic which is divided into slices to illustrate numerical proportion.',
      categorie : "Comparison",
      image :"assets/img-graph/pie-chart.png"}),
  createChartType({ title: 'Dendogram', simpleData: true, cmpName: 'dendogram', convertData: DendogramComponent.convertData ,dimLabels: [ {column: 'Group by', maxSize: 10}, {column: 'Value', maxSize: 1} ],
      description :'Dendrograms are tree-like diagrams used to represent the distribution of a hierarchical clustering.' +
      ' The different depth levels represented by each node are visualized on the horizontal axes and it is useful to visualize a non-weighted hierarchy.',
      categorie : "Hierarchy",
      image :"assets/img-graph/dendogram.png"}),
  createChartType({ title: 'Zoomable Treemap', simpleData: true, cmpName: 'zoomableTreemapChart', convertData: ZoomableTreemapChartComponent.convertData, dimLabels: [ {column: 'Hierarchy', maxSize: 2} , {column: 'Value', maxSize: 1}, ] }),
  createChartType({ title: 'Pie Grid Chart', simpleData: true, cmpName: 'pieGridChart', convertData: PieGridChartComponent.convertData, dimLabels: [ {column: 'Name', maxSize: 1} ,{column: 'Value', maxSize: 1} ] }),
  createChartType({ title: 'Force Directed Graph', simpleData: true, cmpName: 'ForceDirectedGraph', convertData: ForceDirectedGraphComponent.convertData , dimLabels: [{column: 'Source', maxSize: 1} , {column: 'Source Group', maxSize: 1}, {column: 'Target', maxSize: 1} ,{column: 'Target Group', maxSize: 1} ,{column: 'Value', maxSize: 1}] }),
  createChartType({ title: 'Force Layout Bubble', simpleData: true, cmpName: 'bubbleChart', convertData: BubbleChartComponent.convertData, dimLabels: [ {column: 'category', maxSize: 1} ,{column: 'Label', maxSize: 1} ,{column: 'Value', maxSize: 1} ,{column: 'Description', maxSize: 1} ] }),
  createChartType({ title: 'Force Directed Graph', simpleData: true, cmpName: 'ForceDirectedGraph', convertData: ForceDirectedGraphComponent.convertData ,dimLabels: [{column: 'Source', maxSize: 1} , {column: 'Source Group', maxSize: 1}, {column: 'Target', maxSize: 1} ,{column: 'Target Group', maxSize: 1} ,{column: 'Value', maxSize: 1}],
      escription :'Nested circles allow to represent hierarchies and compare values.' +
      ' This visualization is particularly effective to show the proportion between elements through their areas and their position inside a hierarchical structure. ',
      categorie : "Hierarchy",
      image :"assets/img-graph/forceDirectedGraph.png"}),
  createChartType({ title: 'Bar Vertical 2D', convertData: NgGraphComponent.convertData }),
  createChartType({ title: 'Bar Horizontal 2D', convertData: NgGraphComponent.convertData }),
  createChartType({ title: 'Bar Vertical Stacked', convertData: NgGraphComponent.convertData }),
  createChartType({ title: 'Bar Vertical Normalized', convertData: NgGraphComponent.convertData }),
  createChartType({ title: 'Bar Horizontal Normalized', convertData: NgGraphComponent.convertData }),
  createChartType({ title: 'Polar Chart', convertData: NgGraphComponent.convertData, dimLabels: [{column: 'Group by', maxSize: 1} , {column: 'Angle Values', maxSize: 1} ,{column: 'Radius Values', maxSize: 1}] }),
  createChartType({ title: 'Line Chart', convertData: NgGraphComponent.convertData, dimLabels: [{column: 'GroupBy', maxSize: 1} , {column: 'x-Values', maxSize: 1} , {column: 'y-Values', maxSize: 1}],
      description :'Is an interactive line chart that can be configured for multiple axes. ' +
      'The multi-axis line chart is a special type of chart that allows multiple y-axes to be rendered in the same chart. ' +
      'The advantage of using a multi-axis line chart is that you can plot multiple data sets with different types of units and different scale ranges  on the same chart.',
      categorie : "Comparison",
      image :"assets/img-graph/line-chart.png"}),
  createChartType({ title: 'Heat Map', convertData: NgGraphComponent.convertData, dimLabels: [{column: 'x-Category', maxSize: 1} , {column: 'y-Category', maxSize: 1} , {column: 'Color', maxSize: 1}] }),
  createChartType({ title: 'Bubble Chart', convertData: NgGraphComponent.convertData, dimLabels: [{column: 'GroupBy', maxSize: 1} , {column: 'x-Values', maxSize: 1} , {column: 'y-Values', maxSize: 1}, {column: 'Radius', maxSize: 1}] }),
  createChartType({ title: 'Treemap', simpleData: true, cmpName: 'treemapChart', convertData: TreemapChartComponent.convertData, dimLabels: [{ column: 'Group by', maxSize: 10 }, { column: 'Value', maxSize: 1 }],
      description :'A space filling visualization of data hierarchies and proportion between elements.' +
      'The different hierarchical levels create visual clusters through the subdivision into rectangles proportionally to each element\'s value.' +
      ' Treemaps are useful to represent the different proportion of nested hierarchical data structures.',
      categorie : "Hierarchy",
      image :"assets/img-graph/treempa-chart.png"}),
  createChartType({ title: 'Advanced Pie Chart', simpleData: true, cmpName: 'AdvancedPieChart', convertData: AdvancedPieChartComponent.convertData, dimLabels: [{ column: 'Group by', maxSize: 1 }, { column: 'Value', maxSize: 1 }] }),
  createChartType({ title: 'Gauge Chart', simpleData: true, cmpName: 'GaugeChart', convertData: GaugeChartComponent.convertData, dimLabels: [{ column: 'Group by', maxSize: 1 }, { column: 'Value', maxSize: 1 }] }),
  createChartType({ title: 'Area Chart', simpleData: true, cmpName: 'areaChart', convertData: AreaChartComponent.convertData, dimLabels: [{ column: 'Group by', maxSize: 1 }, { column: 'x-Values', maxSize: 1 }, { column: 'y-Values', maxSize: 1 }] })

];

