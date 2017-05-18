import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select } from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import {SlidesService} from '../slides/services';
import {Slides} from '../slides/index'
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush, // make sure tooltip also works OnPush
    providers:[SlidesService]
})
export class HomeComponent implements OnInit {
    @select(['session', 'token']) loggedIn$: Observable<string>;
    states = ['All', 'Private', 'Public'];
    toSearch = {
        title: '',
        filter: 'All'
    };
    slides: Array<Slides> = [];
    showSlidesList = false;
    constructor(
        private slidesService: SlidesService
    ) { }

    ngOnInit() {
        console.log("init");
    }

    search(paramsTosearch) {
        console.log("search trigger");
        //show slides and hide logo
        this.showSlidesList = true;
        //get search result
        this.toSearch.title = paramsTosearch || '';
        this.slidesService.getSlideToSearch(this.toSearch)
            .subscribe(slides => {
                this.slides = [];
                this.slides = slides;
            });
    }

}
