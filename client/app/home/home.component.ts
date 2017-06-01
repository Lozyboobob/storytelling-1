import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { SlidesService } from 'app/slides';
import { Slides } from 'app/slides';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @select(['session', 'token']) loggedIn$: Observable<string>;

    showSlidesList: boolean;
    private states: Array<string>;
    private toSearch;
    slides: Array<Slides> = [];


    constructor(private slidesService: SlidesService) { }

    ngOnInit() {
        this.showSlidesList = false;
        this.states = ['All'];
        this.toSearch = { title: '', filter: 'Public' };
    }


    searchSlides(searchText) {
        //show slides and hide logo
        this.showSlidesList = true;
        //get search result
        this.toSearch.title = searchText;
        this.slidesService.getSlideToSearch(this.toSearch)
            .subscribe(slides => {
                this.slides = slides;
            });
    }

    
    getAllslides() {
        this.showSlidesList = true;
        this.toSearch.title = '';
        this.slidesService.getSlideToSearch(this.toSearch)
            .subscribe(slides => {
                this.slides = slides;
            });
    }
    
    filterState(state) {

    }

}
