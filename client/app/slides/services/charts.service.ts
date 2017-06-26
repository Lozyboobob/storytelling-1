import { Injectable, Type, ComponentFactoryResolver } from '@angular/core';
import { PieChartComponent, AdvancedPieChartComponent, BarChartComponent, ForceDirectedGraphComponent, 
  GaugeChartComponent, HierarchicalEdgeBundlingComponent, LineChartComponent, DendogramComponent,
  NgGraphComponent, TreemapChartComponent, PieGridChartComponent,Treemap2ChartComponent
}  from "app/charts";
import {ImageComponent} from "../components/slides-presentation/slide-types/"

@Injectable()
export class ChartsService {
  private listWidget;

  constructor(private _resolver : ComponentFactoryResolver) {
    // this.listWidget = Array.from(this._resolver['_factories'].keys());

    this.listWidget = new Map<string, Type<any>>([['PieChartComponent', PieChartComponent], ['AdvancedPieChartComponent', AdvancedPieChartComponent],
      ['BarChartComponent', BarChartComponent], ['ForceDirectedGraphComponent', ForceDirectedGraphComponent],
      ['GaugeChartComponent', GaugeChartComponent], ['HierarchicalEdgeBundlingComponent', HierarchicalEdgeBundlingComponent],
      ['LineChartComponent', LineChartComponent], ['PieGridChartComponent', PieGridChartComponent], ['DendogramComponent', DendogramComponent], ['NgGraphComponent', NgGraphComponent], ['ImageComponent', ImageComponent],
      ['TreemapChartComponent', TreemapChartComponent], ['Treemap2ChartComponent', Treemap2ChartComponent]
     ]);
  }

  getChartType(widgetType: string): Type<any> {
    let cmpType = <Type<any>> this.listWidget.get(widgetType);
    return cmpType;
    // return <Type<any>>this.listWidget.find((x: any) => x.name === widgetType);

  }


}
