import { Component, OnInit } from '@angular/core';
import {WindowResizeService} from '../../window-resize.service';
import {SlidesService} from '../slides.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-slides-list',
    templateUrl: './slides-list.component.html',
    styleUrls: ['./slides-list.component.scss'],
    providers: [WindowResizeService, SlidesService]
})
export class SlidesListComponent implements OnInit {
    slides: Array<any> = [];
    constructor(
        private slidesService: SlidesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.slidesService.getSlidesList()
            .subscribe(
            slide => {
                console.log(slide);
                slide.forEach(s => this.slides.push({
                    id: s._id,
                    title: s.title
                }))
            },
            error => {
                console.log("fail to get Slides list");
            });
    }
    /*open Slide*/
    openSlides(e) {
        console.log(e.target.tagName);
        let target = e.target;
        if (target.tagName != "MD-CARD") {
            target = target.parentNode;
        }
        this.router.navigate(['/slides',target.id]);
    }
    createSlides(){
       this.router.navigate(['/createSlides']);
    }
}
