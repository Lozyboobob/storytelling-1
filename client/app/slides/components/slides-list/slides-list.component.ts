import { Component, OnInit, Input } from '@angular/core';
import { WindowResizeService } from '../../services/window-resize.service';
import {SlidesService} from '../../services/slides.service';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import {Slides} from '../../models/slides'
@Component({
    selector: 'app-slides-list',
    templateUrl: './slides-list.component.html',
    styleUrls: ['./slides-list.component.scss'],
    providers: [WindowResizeService, SlidesService]
})
export class SlidesListComponent implements OnInit {
    @select(['session', 'token']) loggedIn$: Observable<string>;
    @select(['session', 'user', 'username']) username$: Observable<Object>;
    @Input() slides:Array<Slides>;
    @Input() editable:boolean;
    listHeight_style: any = {
        'height': '350px'
    };
    constructor(
        private windowResizeService: WindowResizeService,
        private slidesService: SlidesService,
        private router: Router
    ) {

    }

    ngOnInit() {

    }
    publish(e) {
        e.slidesSetting.public = !e.slidesSetting.public;
        this.slidesService.updateSlide(e, e._id)
            .subscribe(elm => console.log(elm.slidesSetting.public));
    }
}
