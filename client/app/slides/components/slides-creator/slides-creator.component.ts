import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';
import {SlidesService} from '../../services/slides.service';
import {Slides} from '../../models/slides';
import {Slide} from '../../models/slide';
@Component({
    selector: 'app-slides-creator',
    templateUrl: './slides-creator.component.html',
    styleUrls: ['./slides-creator.component.scss'],
    providers: [SlidesService]
})
export class SlidesCreatorComponent implements OnInit {
    form: FormGroup;
    slider: Slides; // the whole slides
    slides: Array<Slide> = [];  //the slides pages
    slideTextTransformed: Array<any> = [];
    curSlideIndex: number = 0;
    constructor(private router: Router, private sanitizer: DomSanitizer, private slidesService: SlidesService, private _fb: FormBuilder) {
        this.form = this._buildForm();
    }

    ngOnInit() {
        this.slider = new Slides();
        this.curSlideIndex = 0;
    }
    private _buildForm() {
        return this._fb.group({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.nullValidator),
            tag: new FormControl('', Validators.nullValidator)
        });
    }
    /* add tages for slides*/
    addTag() {
        this.slider.tags.push(this.form.value.tag);
        this.form.controls.tag.reset();
    }
    /* set banner image*/
    setBanner(path) {
        this.slider.bannerPath = path;
    }
    /*add a new slide*/
    submitSlide(slide) {
        console.log(slide.text);
        this.curSlideIndex++;
        let s: Slide = Object.assign({}, slide);

        s.index = this.curSlideIndex;

        this.slides.push(s);

        this.slideTextTransformed.push(this.sanitizer.bypassSecurityTrustHtml(s.text));


    }
    /*create a new slides*/
    createSlides(sliderData) {
        this.slider.title = sliderData.title;
        this.slider.description = sliderData.description;
        this.slider.slides = this.slides;
        console.log("slider creating..", this.slider);
        //console.log(this.router);
        this.slidesService.submitSlides(this.slider)
            .subscribe(
            data => {
                console.log("created");
                //this.router.navigate(['/login']);
                this.router.navigate(['/slides']);
            },
            error => {
                console.log("fail to createSlides");
            });
    }
}
/*for select graph type*/
const defineGraph = () => {

}
