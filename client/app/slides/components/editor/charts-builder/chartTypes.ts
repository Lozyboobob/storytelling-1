
import { PieChartComponent, AdvancedPieChartComponent, BarChartComponent, ForceDirectedGraphComponent, GaugeChartComponent,
    HierarchicalEdgeBundlingComponent, PieGridChartComponent, LineChartComponent, DendogramComponent, NgGraphComponent, TreemapChartComponent, NumberCardComponent
}  from "app/charts";


function createChartType({title, ...obj}) {

    return {
        title,
        name: titleToName(title),
        dimLabels: [{ column: 'Group by', maxSize: 1 }, { column: 'Name', maxSize: 1 }, { column: 'Value', maxSize: 1 }],
    ...obj
    };

    function titleToName(s: string) {
        return s.toLowerCase().replace(/\ /g, '-');
    }
}


export const chartTypes = [

    createChartType({ title: 'Bar Chart', simpleData: true, cmpName: 'barChart', convertData: BarChartComponent.convertData, dimLabels: [{ column: 'Name', maxSize: 1 }, { column: 'Value', maxSize: 1 }] }),
    createChartType({ title: 'Pie Chart', simpleData: true, cmpName: 'pieChart', convertData: PieChartComponent.convertData, dimLabels: [{ column: 'Name', maxSize: 1 }, { column: 'Value', maxSize: 1 }] }),
    createChartType({ title: 'Dendogram', simpleData: true, cmpName: 'dendogram', convertData: DendogramComponent.convertData, dimLabels: [{ column: 'Group by', maxSize: 10 }, { column: 'Value', maxSize: 1 }] }),
    createChartType({ title: 'Pie Grid Chart', simpleData: true, cmpName: 'pieGridChart', convertData: PieGridChartComponent.convertData, dimLabels: [{ column: 'Name', maxSize: 1 }, { column: 'Value', maxSize: 1 }] }),
    createChartType({ title: 'Force Directed Graph', simpleData: true, cmpName: 'ForceDirectedGraph', convertData: ForceDirectedGraphComponent.convertData, dimLabels: [{ column: 'Source', maxSize: 1 }, { column: 'Source Group', maxSize: 1 }, { column: 'Target', maxSize: 1 }, { column: 'Target Group', maxSize: 1 }, { column: 'Value', maxSize: 1 }] }),
    createChartType({ title: 'Bar Vertical 2D', convertData: NgGraphComponent.convertData }),
    createChartType({ title: 'Bar Horizontal 2D', convertData: NgGraphComponent.convertData }),
    createChartType({ title: 'Bar Vertical Stacked', convertData: NgGraphComponent.convertData }),
    createChartType({ title: 'Bar Vertical Normalized', convertData: NgGraphComponent.convertData }),
    createChartType({ title: 'Bar Horizontal Normalized', convertData: NgGraphComponent.convertData }),
    createChartType({ title: 'Polar Chart', convertData: NgGraphComponent.convertData, dimLabels: [{ column: 'Group by', maxSize: 1 }, { column: 'Angle Values', maxSize: 1 }, { column: 'Radius Values', maxSize: 1 }] }),
    createChartType({ title: 'Line Chart', convertData: NgGraphComponent.convertData, dimLabels: [{ column: 'GroupBy', maxSize: 1 }, { column: 'x-Values', maxSize: 1 }, { column: 'y-Values', maxSize: 1 }] }),
    createChartType({ title: 'Heat Map', convertData: NgGraphComponent.convertData, dimLabels: [{ column: 'x-Category', maxSize: 1 }, { column: 'y-Category', maxSize: 1 }, { column: 'Color', maxSize: 1 }] }),
    createChartType({ title: 'Bubble Chart', convertData: NgGraphComponent.convertData, dimLabels: [{ column: 'GroupBy', maxSize: 1 }, { column: 'x-Values', maxSize: 1 }, { column: 'y-Values', maxSize: 1 }, { column: 'Radius', maxSize: 1 }] }),
    createChartType({ title: 'Number Cards', simpleData: true, convertData: NumberCardComponent.convertData, dimLabels: ['Card Name', 'Card Values', 'Color', null] }),
    createChartType({ title: 'Treemap', simpleData: true, cmpName: 'treemapChart', convertData: TreemapChartComponent.convertData, dimLabels: ['GroupBy', 'Sum of values', null, null] })

];
