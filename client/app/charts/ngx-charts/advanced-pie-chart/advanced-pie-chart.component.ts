import { Component, OnInit, Input } from '@angular/core';
import {Chart} from '../../chart.class';
import { formatLabel } from "@swimlane/ngx-charts";
@Component({
  selector: 'app-advanced-pie-chart',
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.scss']
})
export class AdvancedPieChartComponent extends Chart implements OnInit {
  
  data: Array<any> = [];

  private width: number;
  private height: number;

  view: any[];

  colorScheme: any;
  gradient = false;
  tooltipDisabled = false;


  // margin
  margin: boolean = false;
  marginTop: number = 40;
  marginRight: number = 40;
  marginBottom: number = 40;
  marginLeft: number = 40;

  constructor() { 
       super()  
    }

   ngOnInit() {
    this.colorScheme = {
      name: 'pie',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
      ]
    }

    // Set the data
    this.data =  this.dataInput[0].results;

    this.init();
  }

  init() {
    // this.width = 700;
    // this.height = 300;
    // this.view = [this.width, this.height];
  }


  load() {
    this.data = [];
    setInterval(() => this.data = this.dataInput[0].results);
  }


  ease() {
  }

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  pieTooltipText({data}) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">$${val}</span>
    `;
  }


}
