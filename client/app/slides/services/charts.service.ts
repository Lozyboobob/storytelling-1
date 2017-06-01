import { Injectable, Type, ComponentFactoryResolver } from '@angular/core';
import { PieChartComponent, AdvancedPieChartComponent, BarChartComponent, ForceDirectedGraphComponent, GaugeChartComponent, 
  HierarchicalEdgeBundlingComponent, LineChartComponent, SunburstChartComponent, TreemapChartComponent
}  from "app/charts";

@Injectable()
export class ChartsService {
  private listWidget;

  constructor(private _resolver : ComponentFactoryResolver) {
    // console.log('TAB_COMPONENTS: ', [...TAB_COMPONENTS ]);
    // this.listWidget = Array.from(this._resolver['_factories'].keys());

    this.listWidget = new Map<string, Type<any>>([['PieChartComponent', PieChartComponent], ['AdvancedPieChartComponent', AdvancedPieChartComponent], 
    ['BarChartComponent', BarChartComponent], ['ForceDirectedGraphComponent', ForceDirectedGraphComponent],
     ['GaugeChartComponent', GaugeChartComponent], ['HierarchicalEdgeBundlingComponent', HierarchicalEdgeBundlingComponent],
     ['SunburstChartComponent', SunburstChartComponent], ['TreemapChartComponent', TreemapChartComponent]
     ]);

    console.log('listWidget: ',  this.listWidget);

  }

  getChartType(widgetType: string): Type<any> {
    console.log('widgetType: ', widgetType);
     let cmpType = <Type<any>> this.listWidget.get(widgetType);
     console.log('cmpType: ', cmpType);
     return cmpType;
    // return <Type<any>>this.listWidget.find((x: any) => x.name === widgetType);

  }


}
