import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    slider: any = {};
    slides: Array<any> = [];
    slideTextTransformed: Array<any> = [];
    curSlideIndex: number = 0;
    constructor(private router: Router, private sanitizer: DomSanitizer, private slidesService: SlidesService) {
        this.form = this._buildForm();
    }

    ngOnInit() {
        this.slider = new Slides();
        this.curSlideIndex = 0;
        console.log(this.slider.id);
    }
    private _buildForm() {
        return new FormGroup({
            slidesName: new FormControl('', Validators.required)
        });
    }


    /*for add a new slide*/
    submitSlide(slide) {
        console.log(slide.text);
        this.curSlideIndex++;
        let s:Slide = Object.assign({}, slide);

        s.index = this.curSlideIndex;

        this.slides.push(s);

        this.slideTextTransformed.push(this.sanitizer.bypassSecurityTrustHtml(s.text));


    }
    /*for create a new slides*/
    createSlides(sliderData) {
        this.slider.title = sliderData.slidesName;
        this.slider.slides = this.slides;
        console.log("slider creating..",this.slides);
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
