import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { SlidesService } from 'app/slides';
import { Slides } from 'app/slides';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @select(['session', 'token']) loggedIn$: Observable<string>;

  slides: Array<Slides> = [];
  private length = this.slides.length;
  showSlidesList: boolean;
  noResult: boolean;
  noPublish: boolean;
  private states: Array<string>;
  private selectedValue: string;
  private toSearch;
  private pageSize = 6;
  private pageIndex = 0;
  pageEvent: PageEvent;

  constructor(private slidesService: SlidesService) { }

  ngOnInit() {
    this.showSlidesList = false;
    this.noResult = false;
    this.noPublish = false;
    this.states = ['Public'];
    this.selectedValue = 'Public';
    this.toSearch = { title: '', filter: 'Public' };
  }


  searchSlides(searchText) {
    //show slides and hide logo
    this.showSlidesList = true;
    //get search result
    this.toSearch.title = searchText;
    this.slidesService.getSlideToSearch(this.toSearch, this.pageIndex, this.pageSize)
      .subscribe(slides => {
        this.slides = slides[0];
        this.length = slides[1];
        if (this.slides.length === 0) this.noResult = true;
        else {
          this.noResult = false;
        }
      });
  }


  getAllslides() {
    this.showSlidesList = true;
    this.toSearch.title = '';
    this.slidesService.getSlideToSearch(this.toSearch, this.pageIndex, this.pageSize)
      .subscribe(slides => {
        this.slides = slides[0];
        this.length = slides[1];
        if (this.slides.length === 0) {
          this.noPublish = true;
        } else {
          this.noPublish = false;
        }
      });
  }

  nextPage($event) {
        this.pageEvent = $event;
        this.pageIndex = $event.pageIndex;
        console.log('next', $event.pageIndex);
        this.slidesService.getSlideToSearch(this.toSearch, this.pageIndex, this.pageSize )
            .subscribe(
                slides => {
                    this.slides = slides[0];
                    this.length = slides[1];
                });
    }

}
