import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import {SlidesService, ImagesService} from '../../services/index';
import {Slides} from '../../models/index';
import {NotifBarService} from "app/core";
import {PageEvent} from '@angular/material';
@Component({
    selector: 'app-slides-list',
    templateUrl: './slides-list.component.html',
    styleUrls: ['./slides-list.component.scss']
})

export class SlidesListComponent implements OnInit {
    @select(['session', 'token']) loggedIn$: Observable<string>;
    private result = {
        noResult: false,
        noPublish: false,
        noSlides: false,
        noPrivate: false
    };
    private pageSize = 5;
    private pageSizeOptions = [5, 10, 25, 100];
    private pageIndex = 0;
    private toSearch = {
        title: '',
        filter: 'All',
        favorite: 'All'
    };
    pageEvent: PageEvent;
    private slides: Array<Slides> = [];
    private length = this.slides.length;

    constructor(
        private slidesService: SlidesService,
        private imagesService: ImagesService,
        private notifBarService: NotifBarService
    ) { }
    nextPage($event) {
        this.pageEvent = $event;
        this.pageIndex = $event.pageIndex;
        console.log('next', $event.pageIndex);
        this.slidesService.getSlidesList( this.pageIndex, this.pageSize )
            .subscribe(
                slides => {
                    this.slides = slides[0];
                    this.length = slides[1];
                    this.result = this.calculResult(this.slides.length, this.toSearch.filter, this.toSearch.title);
                },
                error => {
                    this.notifBarService.showNotif("fail to load slides list");
                });
    }
    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        this.length = this.slides.length;

    }
    ngOnInit() {
        this.slidesService.getSlidesList( this.pageIndex, this.pageSize )
            .subscribe(
            slides => {
                this.slides = slides[0];
                this.length = slides[1];
                this.result = this.calculResult(this.slides.length, this.toSearch.filter, this.toSearch.title);
            },
            error => {
                this.notifBarService.showNotif("fail to load slides list");
            });
    }
    search(paramsTosearch) {
        //get search result
        this.toSearch.title = paramsTosearch || '';
        this.slidesService.getSlideToSearch(this.toSearch, this.pageIndex, this.pageSize)
            .subscribe(slides => {
                this.slides = [];
                this.slides = slides[0];
                this.length = slides[1];
                this.result = this.calculResult(this.slides.length, this.toSearch.filter, this.toSearch.title)
            });
    }

    filterPub(state) {
        this.toSearch.filter = state;
        this.slidesService.getSlideToSearch(this.toSearch, this.pageIndex, this.pageSize)
            .subscribe(slides => {
                this.slides = [];
                this.slides = slides[0];
                this.length = slides[1];
                this.result = this.calculResult(this.slides.length, this.toSearch.filter, this.toSearch.title)
            });
    }
    filterFavor(isFavorite) {
        this.toSearch.favorite = isFavorite;
        this.slidesService.getSlideToSearch(this.toSearch, this.pageIndex, this.pageSize)
            .subscribe(slides => {
                this.slides = [];
                this.slides = slides[0];
                this.length = slides[1];
                this.result = this.calculResult(this.slides.length, this.toSearch.filter, this.toSearch.title)
            });

    }
    refreshList() {
        this.slidesService.getSlideToSearch(this.toSearch, this.pageIndex, this.pageSize)
            .subscribe(slides => {
                this.slides = [];
                this.slides = slides[0];
                this.length = slides[1];
                this.result = this.calculResult(this.slides.length, this.toSearch.filter, this.toSearch.title);

            });
    }

    calculResult(slidesLength, state, title) {
        if (slidesLength === 0) {
            if (title === "") {
                if (state === "All") {
                    return { noResult: false, noPublish: false, noSlides: true, noPrivate: false };
                } else if (state === "Public") {
                    return { noResult: false, noPublish: true, noSlides: false, noPrivate: false };
                } else if (state === "Private") {
                    return { noResult: false, noPublish: false, noSlides: false, noPrivate: true };
                }
            } else {
                return { noResult: true, noPublish: false, noSlides: false, noPrivate: false };
            }
        }
        return { noResult: false, noPublish: false, noSlides: false, noPrivate: false };
    }


}
