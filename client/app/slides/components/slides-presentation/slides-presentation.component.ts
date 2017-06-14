import { Component, OnInit, Inject, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { WindowResizeService } from '../../services/window-resize.service';
import { PageScrollInstance, PageScrollService, PageScrollConfig } from 'ng2-page-scroll';
import {DOCUMENT, DomSanitizer} from '@angular/platform-browser';
import {SlidesService} from '../../services/slides.service';
import { BarChartComponent, ForceDirectedGraphComponent, LineChartComponent, TreemapChartComponent, SunburstChartComponent, HierarchicalEdgeBundlingComponent} from 'app/charts';

import { PageConfig, HALF_HALF_LAYOUT, FULL_LAYOUT} from './pageConfig';
import {Slide} from '../../models/slide'
@Component({
    selector: 'app-slides-presentation',
    templateUrl: './slides-presentation.component.html',
    styleUrls: ['./slides-presentation.component.scss'],
    providers: [WindowResizeService, SlidesService]
})

export class SlidesPresentationComponent implements OnInit {
    slides: Array<Slide> = [];
    slideTitle: String;
    slideHeight_style: any = {
        'height': '72px'
    };
    slideHeight: number;
    curSlide: Slide;
    lastSlide: Slide;
    curSlideIndex: number = 0;
    lastSlideIndex: number;
    slideNum: number;
    charts: Array<any> = [];
    loadContentAni: Array<boolean> = []; // indicator for content load animation
    easeContentAni: Array<boolean> = []; // indicator for content ease(fade away) animation
    pageLayoutConfig: Array<any> = [];
    inEaseProcess = false;
    curSlide$: BehaviorSubject<Slide> = new BehaviorSubject<Slide>(null);
    slideload$: BehaviorSubject<Slide> = new BehaviorSubject<Slide>(null);
    slideease$: BehaviorSubject<Slide> = new BehaviorSubject<Slide>(null);

    @ViewChildren('chart') chartEle: any;

    constructor(
        private windowResizeService: WindowResizeService,
        private pageScrollService: PageScrollService,
        private slidesService: SlidesService,
        @Inject(DOCUMENT) private document: any,
        private sanitizer: DomSanitizer,
        private router: Router,
        private route: ActivatedRoute
    ) {
        /* config of scroll*/
        PageScrollConfig.defaultScrollOffset = 50;
        PageScrollConfig.defaultInterruptible = false;
        PageScrollConfig.defaultDuration = 800;
        // PageScrollConfig.defaultEasingLogic = {
        //     ease: (t: number, b: number, c: number, d: number): number => {
        //         // easeInOutExpo easing
        //         if (t === 0) return b;
        //         if (t === d) return b + c;
        //         if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        //         return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        //     }
        // };
        /*set the slide size to fit window size*/
        this.windowResizeService.height$.subscribe(height => {
            this.slideHeight_style = {
                'height': (height - 65) + 'px' //50 is the height of header
            };
            this.slideHeight = (height - 65);
        })

    }
    ngOnInit() {
        let id;
        this.route.params.subscribe(params => {
            id = params['id'];
        });
        /* generate and initialize slides*/
        this.slidesService.getSlides(id).subscribe(
            slide => {
                this.slides = slide.slides;
                this.slideNum = this.slides.length;
                this.slideTitle = slide.slidesSetting.title;
                console.log("get slides", this.slides);
                this.curSlideIndex = 0;
                this.curSlide = new Slide();
                console.log(this.curSlide);
            },
            error => {
                console.log("fail to get slides data");
            });
        window.scrollTo(0, 0);//scroll to top everytime open the slides

    }

    /*init the charts*/
    // private initCharts() {
    //     let charts = this.chartEle.toArray();
    //     let chartCounter = 0;
    //     //if there is no graph on the i-th slide, then store  chart[i] as null
    //     this.slides.forEach(s => {
    //         if (s.hasGraph)
    //             this.charts.push(charts[chartCounter++]);
    //         else
    //             this.charts.push(null);
    //     });
    //     this.charts.forEach((e, i) => {
    //         if (e != null) {
    //             if (e.constructor.name != 'ElementRef') {
    //                 console.log(this.pageLayoutConfig[i].pageCol)
    //                 let data = this.slides[i].data;
    //                 e.setData(data);
    //                 e.init();
    //             }
    //         }
    //     });
    // }

    /*Chart operation*/
    // loadChart(index) {
    //     if (this.pageLayoutConfig[index].hasChart) {
    //         this.charts[index].load();
    //     }
    // }
    // easeChart(index) {
    //     if (this.pageLayoutConfig[index].hasChart) {
    //         this.charts[index].ease();
    //     }
    // }
    // loadContent(index) {
    //     if (!this.pageLayoutConfig[index].hasText) return false;
    //     this.loadContentAni[index] = false;
    //     // setTimeout(_ => {
    //         this.easeContentAni[index] = false; this.loadContentAni[index] = true
    //     // }, 625);
    // }
    // easeContent(index) {
    //     //    if (this.inEaseProcess) return;
    //     if (!this.pageLayoutConfig[index].hasText) return false;
    //     this.inEaseProcess = true;
    //     this.easeContentAni[index] = false;
    //     ;
    //     setTimeout(_ => { this.loadContentAni[index] = false; this.easeContentAni[index] = true }, 0);
    //     setTimeout(_ => this.inEaseProcess = false, 50);
    // }
    // slide switch operation


    toLastSlide() {
        /*  if (this.charts.length == 0 || this.charts === undefined) {
              this.initCharts();
          }*/
        //  this.curSlideIndex = this.getCurSlideIndex();
        if (this.curSlideIndex > 0) {
            // this.easeChart(this.curSlideIndex - 1);
            // this.easeContent(this.curSlideIndex - 1);

            //  this.slideease$.next(this.curSlideIndex);
            this.curSlideIndex--;
            this.curSlide = null;

            //    this.goToSlide(this.curSlideIndex);

            // if (this.curSlideIndex != 0) {
            //     this.loadChart(this.curSlideIndex - 1);
            //     this.loadContent(this.curSlideIndex - 1);
            // }
            if (this.curSlideIndex > 0) this.slideload$.next(this.curSlide);

        }
    }

    toNextSlide() {
        /*  if (this.charts.length == 0 || this.charts === undefined) {
              this.initCharts();
          }*/
        //this.curSlideIndex = this.getCurSlideIndex();
        if (this.curSlideIndex < this.slideNum) {
            // if (this.curSlideIndex != 0) {
            //     this.easeChart(this.curSlideIndex - 1);
            //     this.easeContent(this.curSlideIndex - 1);
            // }

            //this.slideease$.next(this.curSlideIndex);


            //  this.goToSlide(this.curSlideIndex);

            this.curSlideIndex++;
            this.curSlide = this.slides[this.curSlideIndex - 1];
            console.log("curSlide:", this.curSlide);

            console.log('curSlideIndex : ', this.curSlideIndex);

            this.slideload$.next(this.curSlide);

            // this.loadChart(this.curSlideIndex - 1);
            /*add animation to text content*/
            // this.loadContent(this.curSlideIndex - 1);
        }
        else {
            /*this.snackBar.openFromComponent(ScrollToEndComponent, {
                duration: 500,
            });*/

        }
    }

    scroll2Slide() {
        let scrollDis = document.body.scrollTop;
        let curIndex = Math.round(scrollDis / this.slideHeight);
        if (curIndex !== this.curSlideIndex) {
            this.slideease$.next(this.curSlide);
            this.slideload$.next(this.curSlide);
            this.curSlideIndex = curIndex;
        }
    }

    staySlideProcess() {

    }

    private goToSlide(index: number) {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#slide-' + index);
        this.pageScrollService.start(pageScrollInstance);
    }

    private getCurSlideIndex(): number {
        let scrollDis = document.body.scrollTop;
        console.log('scrollDis: ', scrollDis);
        console.log('this.slideHeight: ', this.slideHeight);

        let curIndex = Math.round(scrollDis / this.slideHeight);
        return curIndex;
    }

    check() {
        return true;
    }
}
