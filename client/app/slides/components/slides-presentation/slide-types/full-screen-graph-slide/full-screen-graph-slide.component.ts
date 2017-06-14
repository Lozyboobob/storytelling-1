import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Component, OnInit, AfterContentInit, Input, ViewChild, ViewChildren, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Slide } from "../../../../models";
import { PageConfig, FULL_LAYOUT } from "../../pageConfig";
import { Chart } from "../../../../../charts/chart.class";
import { ChartsService } from "../../../../services";
@Component({
    selector: 'app-full-screen-graph-slide',
    templateUrl: './full-screen-graph-slide.component.html',
    styleUrls: ['./full-screen-graph-slide.component.scss']
})
export class FullScreenGraphSlideComponent implements OnInit, AfterContentInit {

    slide: Slide;
    @Input() pos: number;
    @Input() slideload$: Observable<Slide>;
    @Input() slideease$: Observable<Slide>;

    @ViewChild('parent', { read: ViewContainerRef })
    parent: ViewContainerRef;
    private componentRef: ComponentRef<Chart>;

    config: PageConfig;
    loadContentAni: boolean;
    easeContentAni: boolean;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver,
        private chartsService: ChartsService,
        private sanitizer: DomSanitizer) { }


    ngAfterViewInit() {

    }

    ngOnInit() {
        //  this.slide=new Slide()
        //  this.slide=new Slide();
    }


    ngAfterContentInit() {
        /*  console.log("after init");
          if (this.slide.graph === 'noGraph') return;
          const cmpType: string = this.slide.graph.charAt(0).toUpperCase() + this.slide.graph.slice(1) + 'Component';
          this.setChart(cmpType)*/
        this.slideload$.subscribe((slide) => {
            this.slide = slide;
            this.setConfig();
            if (slide.graph === 'noGraph') return;

            let cmpType: string = slide.graph.charAt(0).toUpperCase() + slide.graph.slice(1) + 'Component';
            console.log(slide);

            this.setChart(cmpType);
            this.loadChart();
            //this.loadContent();
        })
        /*  this.slideease$.filter(n => n === this.pos).subscribe(() => {
              this.easeChart();
              //this.easeContent();
          })*/
    }

    private setChart(chartType: string) {
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.chartsService.getChartType(chartType));
        this.parent.clear();
        this.componentRef = this.parent.createComponent(componentFactory);
        this.componentRef.instance.dataInput = this.slide.data; // set the input inputData of the abstract class Chart
        if (this.config.hasChart) {
            (<Chart>this.componentRef.instance).init();
        }

    }

    private setConfig() {
        this.config = new PageConfig();
        Object.assign(this.config, FULL_LAYOUT);
        this.slide.text = this.sanitizer.bypassSecurityTrustHtml(this.slide.text) as string;

        this.loadContentAni = true;
        this.easeContentAni = false;

        if (this.slide.graph == "image") {
            if (this.slide.fullScreenHtml.length)
                this.slide.fullScreenHtml = this.sanitizer.bypassSecurityTrustHtml(this.slide.fullScreenHtml) as string;
            this.config.hasImage = true;
        }
        else {
            this.config.hasChart = true;

        }
    }

    private loadChart() {
        console.log("load");
        if (this.config.hasChart) {
            (<Chart>this.componentRef.instance).load();
        }
    }

    private easeChart() {
        console.log("ease")
        if (this.config.hasChart) {
            (<Chart>this.componentRef.instance).ease();
        }
    }


    private loadContent() {
        if (this.config.hasText) {
            this.loadContentAni = false;
            //setTimeout(_ => {
            this.easeContentAni = false;
            this.loadContentAni = true
            //  }, 625);
        }
    }

    private easeContent() {
        if (this.config.hasText) {
            this.easeContentAni = false;
            //  setTimeout(() => {
            this.loadContentAni = false;
            this.easeContentAni = true
            //  }, 0);
        }
    }

}
