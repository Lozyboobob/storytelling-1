import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
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
export class HomeComponent implements OnInit,AfterViewChecked {
    @select(['session', 'token']) loggedIn$: Observable<string>;
    states = ['All'];
    toSearch = {
        title: '',
        filter: 'Public'
    };
    slides: Array<Slides> = [];
    showSlidesList = false;
    constructor(
        private slidesService: SlidesService,
            private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {

    }
    ngAfterViewChecked() {
        this.cdRef.detectChanges();
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
    getAllslides(){
      this.showSlidesList = true;
      this.toSearch.title = '';
      this.slidesService.getSlideToSearch(this.toSearch)
          .subscribe(slides => {
              this.slides = [];
              this.slides = slides;
          });
    }
    filterState(state) {

    }

}
