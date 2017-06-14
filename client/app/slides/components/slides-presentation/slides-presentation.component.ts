import { Component, OnInit, Inject, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { WindowResizeService } from '../../services/window-resize.service';
import { PageScrollInstance, PageScrollService, PageScrollConfig } from 'ng2-page-scroll';
import {DOCUMENT, DomSanitizer} from '@angular/platform-browser';
import {SlidesService} from '../../services/slides.service';
import { BarChartComponent, ForceDirectedGraphComponent, LineChartComponent, TreemapChartComponent, SunburstChartComponent, HierarchicalEdgeBundlingComponent} from 'app/charts';

import { PageConfig, HALF_HALF_LAYOUT, FULL_LAYOUT} from './pageConfig';

@Component({
    selector: 'app-slides-presentation',
    templateUrl: './slides-presentation.component.html',
    styleUrls: ['./slides-presentation.component.scss'],
    providers: [WindowResizeService, SlidesService]
})

export class SlidesPresentationComponent implements OnInit {
    slides: Array<any> = [];
    slideTitle: String;
    slideHeight_style: any = {
        'height': '72px'
    };
    slideHeight: number;
    curSlideIndex: number = 0;
    currentSlide: any;
    slideNum: number;
    charts: Array<any> = [];
    loadContentAni: Array<boolean> = []; // indicator for content load animation
    easeContentAni: Array<boolean> = []; // indicator for content ease(fade away) animation
    pageLayoutConfig: Array<any> = [];
    inEaseProcess = false;

    slideload$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    slideease$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

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
        this.windowResizeService.height$.subscribe(height => {
            this.slideHeight_style = {
                'height': ( height - 70 )  + 'px' //50 is the height of header
            };
            this.slideHeight = ( height - 70 ) ;
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
                this.currentSlide = this.slides[0];
            },
            error => {
                console.log("fail to get slides data");
            });
          window.scrollTo(0,0);//scroll to top everytime open the slides

    }


    lastSlide() {
        /*  if (this.charts.length == 0 || this.charts === undefined) {
              this.initCharts();
          }*/
        this.curSlideIndex = this.getCurSlideIndex();
        if (this.curSlideIndex > 0) {
            // this.easeChart(this.curSlideIndex - 1);
            // this.easeContent(this.curSlideIndex - 1);
            this.slideease$.next(this.curSlideIndex);
            this.curSlideIndex--;
            this.goToSlide(this.curSlideIndex);

            // if (this.curSlideIndex != 0) {
            //     this.loadChart(this.curSlideIndex - 1);
            //     this.loadContent(this.curSlideIndex - 1);
            // }

            this.slideload$.next(this.curSlideIndex);

        }
    }

    nextSlide() {
        /*  if (this.charts.length == 0 || this.charts === undefined) {
              this.initCharts();
          }*/

        this.curSlideIndex = this.getCurSlideIndex();
        if (this.curSlideIndex < this.slideNum) {
            // if (this.curSlideIndex != 0) {
            //     this.easeChart(this.curSlideIndex - 1);
            //     this.easeContent(this.curSlideIndex - 1);
            // }
            this.slideease$.next(this.curSlideIndex);
            this.curSlideIndex++;
            // console.log('curSlideIndex : ', this.curSlideIndex);
            this.goToSlide(this.curSlideIndex);
            this.slideload$.next(this.curSlideIndex);
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

    scroll2Slide(event){
        let scrollDis = document.body.scrollTop;
        let curIndex = Math.round(scrollDis / this.slideHeight);
        if( curIndex !== this.curSlideIndex ) {
            this.slideease$.next(this.curSlideIndex);
            this.slideload$.next(curIndex);
            this.curSlideIndex = curIndex;
        }
    }

    switchSlide(direction: number){
        console.log("switchSlide: ", direction);
        let nextIndex = this.curSlideIndex + direction ;
        if(nextIndex >= 0 && nextIndex < this.slideNum)
            this.curSlideIndex = nextIndex;
        
        this.currentSlide = this.slides[this.curSlideIndex];

        console.log("this.curSlideIndex: ", this.curSlideIndex);
        console.log("this.currentSlide: ", this.currentSlide);
        
    }

    staySlideProcess() {

    }

    private goToSlide(index: number) {
      let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#slide-' + index);
      this.pageScrollService.start(pageScrollInstance);
    }

    private getCurSlideIndex(): number {
        let scrollDis = document.body.scrollTop;
        // console.log('scrollDis: ', scrollDis);
        // console.log('this.slideHeight: ', this.slideHeight);

        let curIndex = Math.round(scrollDis / this.slideHeight);
        return curIndex;
    }

    check() {
        return true;
    }
}
