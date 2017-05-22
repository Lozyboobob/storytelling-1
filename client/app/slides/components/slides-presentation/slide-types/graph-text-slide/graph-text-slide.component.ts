import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit, Input, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Slide } from "../../../../models";
import { PageConfig, HALF_HALF_LAYOUT } from "../../pageConfig";
import { Chart } from "../../../../../charts/chart.interface";

@Component({
  selector: 'app-graph-text-slide',
  templateUrl: './graph-text-slide.component.html',
  styleUrls: ['./graph-text-slide.component.scss']
})
export class GraphTextSlideComponent implements OnInit {

  @Input() slide: Slide;
  @Input() pos: number;
  @Input() slideload$: Observable<number>;
  @ViewChild('chart') chartEle: Chart;
  config: PageConfig;
  loadContentAni: boolean;
  easeContentAni: boolean;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.setConfig();
    setTimeout(_ => this.initChart());
    this.slideload$.filter(n => n === this.pos).subscribe(() => {
      this.easeChart();
      this.loadChart();
      this.easeContent();
      this.loadContent();
    })
  }

  private setConfig() {
    this.config = new PageConfig();
    Object.assign(this.config, HALF_HALF_LAYOUT);
    if (this.slide.graph == "image") {
      if (this.slide.fullScreenHtml.length)
        this.slide.fullScreenHtml = this.sanitizer.bypassSecurityTrustHtml(this.slide.fullScreenHtml) as string;
      this.config.hasImage = true;
    }
    else {
      this.config.hasChart = true;
    };
    console.log("config is",this.slide.fullScreenHtml);
  }


  private initChart() {
    if (this.config.hasChart) {
      this.chartEle.setData(this.slide.data);
      this.chartEle.init();
    }
  }

  private loadChart() {
    if (this.config.hasChart) {
      this.chartEle.load();
    }
  }

  private easeChart() {
    if (this.config.hasChart) {
      this.chartEle.ease();
    }
  }


  private loadContent() {
    if (this.config.hasText) {
      this.loadContentAni = false;
      setTimeout(_ => {
        this.easeContentAni = false;
        this.loadContentAni = true
      }, 625);
    }
  }

  private easeContent() {
    if (this.config.hasText) {
      this.easeContentAni = false;
      setTimeout(() => {
        this.loadContentAni = false;
        this.easeContentAni = true
      }, 0);
    }
  }

}
