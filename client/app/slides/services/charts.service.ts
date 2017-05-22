import { Injectable, Type } from '@angular/core';
import { BarChartComponent, ForceDirectedGraphComponent, LineChartComponent, TreemapChartComponent} from 'app/charts';

@Injectable()
export class ChartsService {
  private listWidget;

  constructor() {
    this.listWidget = { 'LineChartComponent': LineChartComponent, 'BarChartComponent': BarChartComponent, 'ForceDirectedGraphComponent': ForceDirectedGraphComponent, 'TreemapChartComponent': TreemapChartComponent };

   }

  getChartType(widgetType: string): Type<any> {
    return this.listWidget[widgetType];
  }


}
