import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray  } from '@angular/forms';
import {ValidService} from '../../../../services/valid.service';
import { environment } from '../../../../../../environments/environment';
import * as slideOption from './slideOption';

import { Slide } from '../../../../models/slide';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.scss'],
    providers: []
})

export class SlideComponent implements OnInit, OnChanges {

    @Output() deleteSlideOpt: EventEmitter<number> = new EventEmitter(); //event:delete a page of slide
    @Output() openSlideIndexOpt: EventEmitter<number> = new EventEmitter();//event:toggle a slide form
    @Input() slideIndex: number;  //slide index
    @Input() slideOpendIndex: number; //toggled open slide index
    @Input() slideSetting: Slide; //if it's not a new slide, the previous setting of the slide

    private slide: Slide; //slide setting
    private form: FormGroup;//slide setting form
    private showForm: boolean; // indicator:showing slide form
    private dataBuilder: any; //data builder of graph
    private pageLayoutOption: Array<any>; // page layout option of the slide
    private titleAlignOption: Array<string>; //title align option of the slide
    private editorOptions: Object;//option of the text editor
    private isChartBuilderValid: boolean;//indicator for validation of chart builder


    constructor(private _fb: FormBuilder, private validService: ValidService) {
        this.slide = new Slide();
        this.form = this._buildForm();
        this.showForm = true;
        this.dataBuilder = {};

        this.titleAlignOption = slideOption.titleAlign;
        this.pageLayoutOption = slideOption.pageLayoutOption;

        this.isChartBuilderValid = true;
        // set server path
        let baseURL = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseURL += `:${environment.backend.port}`;
        };
        this.editorOptions = {
            heightMin: 200,
            heightMax: 400,
            charCounterMax: 3000,
            toolbarSticky: false,
            imageUploadURL: `${baseURL}${environment.backend.endpoints.imagesServer}`,
            imageManagerLoadURL: `${baseURL}${environment.backend.endpoints.imagesServer}`
        };

    }

    ngOnInit() {
        if (!this.slide.pageLayout) {
            this.openSlideIndexOpt.emit(this.slideIndex);
            this.validService.changeSlideValid(false, this.slideIndex, "LAYOUT");
        }

    }

    ngOnChanges(changes) {
        if (changes.hasOwnProperty("slideSetting")) {
            this.slide = this.slideSetting;
            this.validService.changeSlideValid(this.slide.pageLayout && this.isChartBuilderValid, this.slideIndex);
        }
        if (changes.hasOwnProperty("slideIndex")) {
            this.slide.index = this.slideIndex;
        }
        if (changes.hasOwnProperty("slideIndex") || changes.hasOwnProperty("slideOpendIndex")) {
            this.showForm = this.slideIndex === this.slideOpendIndex;
        }
    }

    private _buildForm() {
        return this._fb.group({
            pageTitle: new FormControl(this.slide.pageTitle.title, Validators.nullValidator),
            titleAlign: new FormControl(this.slide.pageTitle.align, Validators.nullValidator),
            slideText: new FormControl(this.slide.text, Validators.nullValidator)
        });
    }

    /* toggle the slide form*/
    toggleForm() {
        this.showForm = !this.showForm;
        if (this.showForm) {
            this.openSlideIndexOpt.emit(this.slideIndex);
        }
        else {
            this.openSlideIndexOpt.emit(-1);
        }
    }

    /*validation for the childForm of slideForm*/
    validChildForm(isValid) {
        this.validService.changeSlideValid(isValid, this.slideIndex);
    }
    /*confirm the slide setting*/
    confirmSlide(isValid) {
        if (this.slide.hasGraph) {
            if (this.dataBuilder.chartOptions.chartType
                && this.dataBuilder.chartOptions.chartType.cmpName != null) {
                this.slide.graph = this.dataBuilder.chartOptions.chartType.cmpName;
            } else {
                this.slide.graph = 'ngGraph';
            }
            this.slide.data = this.dataBuilder.data;
            this.slide.config = this.dataBuilder.chartOptions;
        } else {
            this.slide.graph = 'noGraph';
        }
        if (!this.slide.hasText) {
            this.slide.text = '';
        }
        if (this.slideIndex) {
            this.slide.index = this.slideIndex;
        }
        this.slide.pageTitle.title = this.form.value.pageTitle;
        this.slide.pageTitle.align = this.form.value.titleAlign;
    }
    /*confirm graph setting*/
    confirmeSlideGRaphConfig(data) {
        this.dataBuilder.data = data.data;
        this.dataBuilder.chartOptions = data.chartOptions;
    }
    /*delete slide*/
    deleteSlide(e) {
        this.deleteSlideOpt.emit(this.slideIndex);
    }
    /*change page layout*/
    pageLayoutChange(value) {
        switch (value) {
            case 'FullScreenGraph':
                this.slide.hasGraph = true;
                this.slide.hasText = false;
                break;
            case 'textInCenter': this.slide.hasGraph = false; this.slide.hasText = true; break;
            case 'textInCenterImageBackground': this.slide.hasGraph = false; this.slide.hasText = true; break;
            case 'LeftGraphRightText': this.slide.hasGraph = true; this.slide.hasText = true; break;
            case 'LeftTextRightGraph': this.slide.hasGraph = true; this.slide.hasText = true; break;
            default: break;
        }
        this.slide.pageLayout = value;
        this.validService.changeSlideValid(true, this.slideIndex);
    }
    /*change bkg layout*/
    imgLayoutChange(value) {
        this.slide.bkgLayout = value;
    }
    /*change text vertical align*/
    textAlignChange(value) {
        this.slide.textVerAlign = value;
    }
    /* set image path*/
    setImageHtml(image) {
        this.slide.slideImage = image;
    }
}
