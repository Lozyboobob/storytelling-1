import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {Slides} from '../../models/slides';
import {Slide} from '../../models/slide';
@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnChanges {
    curSlideIndex: number = 1;// the slide that will be created(the amounts of slides pages +1 )
    slider: Slides = new Slides(); // the whole slides
    isValidated: boolean = false;

    @Input() sliderIpt: Slides;
    @Output() submit = new EventEmitter();
  //  @Output() validate= new EventEmitter();


    //@Output() formValidateChangek=new EventEmitter();
    constructor() { }

    ngOnInit() {
    }
    ngOnChanges() {
        if (this.sliderIpt) {
          this.slider = this.sliderIpt;
          this.isValidated=true;
        }
    }
    /* trigger when slides setting change*/
    slidesSettingChange(setting) {
        this.slider.slidesSetting = setting;
    }
    /* validate status change*/
    submitValidateChange(status) {
        this.isValidated = status;
        //this.validate.emit(status);
    }
    /*add a new slide*/
    addSlide() {
        let s = new Slide(this.curSlideIndex++);
        this.slider.slides.push(s);
    }
    /* in edit mode, save the change of a page of slide*/
    saveSlide(slide) {
        try {
            this.slider.slides[slide.index - 1] = Object.assign({}, slide);
        }
        catch (err) {
            console.log(err);
        }
    }
    /*submit a new slide*/
    submitSlide(slide) {
        /* modify slide*/
        if (slide.index < this.curSlideIndex) {
            this.slider.slides[slide.index - 1] = Object.assign({}, slide);
            console.log("slide existing");
        }
        /* create new slide*/
        else {
            this.curSlideIndex++;
            let s: Slide = Object.assign({}, slide);
            s.index = this.curSlideIndex;
            this.slider.slides.push(s);
            console.log("slide new");
        }



    }
    /* delete a page of slide*/
    deleteSlide(index) {
        try {
            if (index < this.curSlideIndex) {
                this.slider.slides.splice(index - 1, 1);
                /*change slide index*/
                this.slider.slides.forEach(
                    s => {
                        if (s.index > index - 1)
                            s.index--;
                    }
                )
                this.curSlideIndex--;
                console.log("slide deleted in local");
            }
        }
        catch (err) {
            console.log("slide cannot be deleted");
        }
    }
}
