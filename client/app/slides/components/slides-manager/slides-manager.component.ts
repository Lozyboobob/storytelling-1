import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import {SlidesService} from '../../services/index';
import {Slides} from '../../models/index'
@Component({
    selector: 'app-slides-manager',
    templateUrl: './slides-manager.component.html',
    styleUrls: ['./slides-manager.component.scss']
})
export class SlidesManagerComponent implements OnInit {
    @select(['session', 'token']) loggedIn$: Observable<string>;
    private states = ['All', 'Private', 'Public'];
    private selectedValue = 'All';
    Result = {noResult : false, noPublish : false, noSlides: false, noPrivate : false};
    toSearch = {
        title: '',
        filter: 'All'
    };
    slides: Array<Slides> = [];
    constructor(
        private slidesService: SlidesService
    ) { }

    ngOnInit() {
      this.slidesService.getSlidesList()
          .subscribe(
          slide => {
              console.log('toto: ', slide);
              /*slide.forEach(s => this.slides.push(new SlidesListItem(s.slidesSetting)))*/
              this.slides = slide;
              this.Result = this.calculResult(this.slides.length, this.toSearch.filter, this.toSearch.title )
          },
          error => {
              console.log('fail to get Slides list');
          });
    }

    search(paramsTosearch) {
        console.log("search trigger");
        //get search result
        this.toSearch.title = paramsTosearch || '';
        this.slidesService.getSlideToSearch(this.toSearch)
            .subscribe(slides => {
                this.slides = [];
                this.slides = slides;
                this.Result = this.calculResult(this.slides.length, this.toSearch.filter, this.toSearch.title )
            });
    }

    filterState(state) {
        this.toSearch.filter = state;
        this.slidesService.getSlideToSearch(this.toSearch)
            .subscribe(slides => {
                this.slides = [];
                this.slides = slides;
                this.Result = this.calculResult(this.slides.length, this.toSearch.filter, this.toSearch.title )

            });
    }
    refreshList() {
        this.slidesService.getSlideToSearch(this.toSearch)
            .subscribe(slides => {
                this.slides = [];
                this.slides = slides;
               this.Result = this.calculResult(this.slides.length, this.toSearch.filter, this.toSearch.title )

            });
    }

    calculResult(slidesLength, state, title){
        let result;
        if (slidesLength === 0) {
            if (title === '') {
                if (state === 'All') {
                    result = {noResult : false, noPublish : false, noSlides: true, noPrivate : false};
                } else if (state === 'Public') {
                    result = {noResult : false, noPublish : true, noSlides: false, noPrivate : false};
                } else if (state === 'Private') {
                    result = {noResult : false, noPublish : false, noSlides: false, noPrivate : true};
                }
            } else {
                result = {noResult : true, noPublish : false, noSlides: false, noPrivate : false};
            }
        }
        return result;
    }

}
