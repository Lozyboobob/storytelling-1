import { Component, OnInit, Inject, ViewChildren, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { DomSanitizer} from '@angular/platform-browser';

import { PageConfig, HALF_HALF_LAYOUT, FULL_LAYOUT} from './pageConfig';
import { slideTransition } from "./slide.animation";
import * as screenfull from 'screenfull';

import { WindowResizeService } from '../../services/window-resize.service';
import {NotifBarService} from "app/core";
import {SlidesService} from '../../services/slides.service';

@Component({
    selector: 'app-slides-presentation',
    templateUrl: './slides-presentation.component.html',
    styleUrls: ['./slides-presentation.component.scss'],
    animations: [slideTransition()],
    providers: [WindowResizeService, SlidesService]
})

export class SlidesPresentationComponent implements OnInit {
    private slides: Array<any> = [];
    private slideTitle: String;
    private slideHeight_style: any;
    private contentHeight_style: any;
    private slideHeight: number;
    private curSlideIndex: number = 0;
    private direction: number = 1;
    private currentSlide: any;
    private slideNum: number;
    private charts: Array<any> = [];
    private pageLayoutConfig: Array<any> = [];
    private screenfull: any;
    private showFullScreen: boolean = false;

    @ViewChildren('chart') chartEle: any;
    @ViewChild('slider', { read: ViewContainerRef }) slider: ViewContainerRef;

    constructor(
        private windowResizeService: WindowResizeService,
        private slidesService: SlidesService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private route: ActivatedRoute,
        private notifBarService: NotifBarService
    ) {
        this.windowResizeService.height$.subscribe(height => {
            this.slideHeight_style = {
                'height': (height - 70) + 'px' //70 is the height of header
            };
            this.contentHeight_style = {
                'height': (height - 70 - 50) + 'px'
            }
            this.slideHeight = (height - 70);
        })
        this.screenfull = screenfull;

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
                this.slides.forEach(s => {
                    if (s.text.length) {
                        s.text = this.sanitizer.bypassSecurityTrustHtml(s.text) as string;
                    }
                })
            },
            error => {
                this.notifBarService.showNotif("fail to load slides, error is " + error);
            });

    }

    switchSlide(direction: number) {
        let nextIndex = this.curSlideIndex + direction;
        if (nextIndex >= 0 && nextIndex <= this.slideNum) {
            this.curSlideIndex = nextIndex;
            this.currentSlide = this.slides[this.curSlideIndex - 1];
            this.direction = direction;
        }
        //hide full screen
        this.showFullScreen = false;
    }

    @HostListener('mouseenter')
    onMouseEnter() {
        this.showFullScreen = true;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.showFullScreen = false;
    }

    onClick() {
        if (this.screenfull.enabled) {
            this.screenfull.toggle(this.slider.element.nativeElement);

        }
    }
}
