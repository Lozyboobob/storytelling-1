import { Injectable, Type, ComponentFactoryResolver } from '@angular/core';

@Injectable()
export class ChartsService {
  private listWidget;

  constructor(private _resolver : ComponentFactoryResolver) {
    this.listWidget = Array.from(this._resolver['_factories'].keys());
  }

  getChartType(widgetType: string): Type<any> {
    return <Type<any>>this.listWidget.find((x: any) => x.name === widgetType);
  }


}
