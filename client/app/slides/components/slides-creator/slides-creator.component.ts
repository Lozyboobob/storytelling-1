
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';
import {SlidesService} from '../../services/slides.service';
import {Slides} from '../../models/slides';
import {SlidesSetting} from '../../models/slides-setting';
import {Slide} from '../../models/slide';
import { EditorComponent} from '../editor/editor.component';
@Component({
    selector: 'app-slides-creator',
    templateUrl: './slides-creator.component.html',
    styleUrls: ['./slides-creator.component.scss'],
    providers: [SlidesService]
})
export class SlidesCreatorComponent implements OnInit {

    isValidated: boolean = false;
    slider: Slides; // the whole slides
    @ViewChild('editor') _editor: EditorComponent;

    constructor(private router: Router, private sanitizer: DomSanitizer, private slidesService: SlidesService) {
        this.slider = new Slides();
    }

    ngOnInit() {

    }

    /* validate status change*/
    formValidateChange(status) {
        console.log("creator detect status;", status);
        this.isValidated = status;
    }

    /*create a new slides*/
    createSlides() {
        console.log('1', this.slider);
        this.slider = this._editor.slider;
        console.log("get slier from editor", this.slider);
        // console.log(this.router);
        this.slidesService.uploadImage(this.slider.slidesSetting.banner).subscribe( id => {
            console.log('id',id);
           this.slider.slidesSetting.imageId = id;
           this.slidesService.submitSlides(this.slider)
              .subscribe(
                  data => {
                      console.log("created");
                      // this.router.navigate(['/login']);
                      this.router.navigate(['/slides']);
                  },
                  error => {
                      console.log("fail to createSlides");
                  });
        });
    };
}
