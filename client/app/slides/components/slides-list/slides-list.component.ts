import { Component, OnInit } from '@angular/core';
import { WindowResizeService } from '../../services/window-resize.service';
import {SlidesService} from '../../services/slides.service';
import { Router } from '@angular/router';
import {SlidesListItem} from '../../models/slides-list-item'
@Component({
    selector: 'app-slides-list',
    templateUrl: './slides-list.component.html',
    styleUrls: ['./slides-list.component.scss'],
    providers: [WindowResizeService, SlidesService]
})
export class SlidesListComponent implements OnInit {
    slides: Array<SlidesListItem> = [];
    listHeight_style: any = {
        'height': '350px'
    };;
    constructor(
        private windowResizeService: WindowResizeService,
        private slidesService: SlidesService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.slidesService.getSlidesList()
            .subscribe(
            slide => {
                slide.forEach(s => this.slides.push(new SlidesListItem(s)))
                console.log(this.slides);
            },
            error => {
                console.log("fail to get Slides list");
            });
        console.log(this.slides)
    }
    /*open Slide*/
    openSlides(e) {
        console.log(e.target.tagName);
        let target = e.target;
        if (target.tagName != "MD-CARD") {
            target = target.parentNode;
        }
        this.router.navigate(['/slides', target.id]);
    }
    test() {
        console.log(this.slides);
    }
}
