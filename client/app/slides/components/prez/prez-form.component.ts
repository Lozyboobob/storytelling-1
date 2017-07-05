import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { SlidesService } from '../../services/slides.service';
import { ValidService } from '../../services/valid.service';
import { Slides } from '../../models/slides';
import { Slide } from '../../models/slide';
import { EditorComponent} from '../editor/editor.component';
import { Observable } from 'rxjs/Observable';
import {NotifBarService} from "app/core";

@Component({
    selector: 'app-prez-form',
    templateUrl: './prez-form.component.html',
    styleUrls: ['./prez-form.component.scss'],
    providers: [SlidesService, ValidService]
})

export class PrezFormComponent implements OnInit, AfterViewChecked {

    id: string = null;
    isValidated: boolean = false;
    slider: Slides = new Slides();
    @ViewChild('editor') _editor: EditorComponent;
    editorValid: Subscription;

    constructor(private router: Router, private sanitizer: DomSanitizer, private slidesService: SlidesService, private validService: ValidService, private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private notifBarService: NotifBarService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.id = params['id'];
            }
        });

        if (this.id) {
            this.slidesService.getSlides(this.id)
                .subscribe(
                slides => {
                    this.slider = slides;
                },
                error => {
                    this.notifBarService.showNotif("fail to load slides list. error is " + error);
                });
            this.editorValid = this.validService.validAll$.subscribe(
                valid => {
                    if (valid)
                        this.isValidated = true;
                    else this.isValidated = false;
                    //  this.cdRef.detectChanges();
                })
        } else {
            this.slider = new Slides();
            this.editorValid = this.validService.validAll$.subscribe(
                valid => {
                    if (valid)
                        this.isValidated = true;
                    else this.isValidated = false;
                    //  this.cdRef.detectChanges();
                });
        }
    }
    ngAfterViewChecked() {
        //this.cdRef.detectChanges();
    }
    /* validate status change*/
    formValidateChange(status) {
        this.isValidated = status;
    }
    // TODO rework service, rename in presentatiion
    /*save slides*/
    saveSlides() {
        console.log(this.slider)
        this.slidesService.updateSlide(this.slider, this.slider._id)
            .subscribe(
            res => {
                this.notifBarService.showNotif("your changes in slides has been saved.");
                this.router.navigate(['/slides']);
            },
            error => this.notifBarService.showNotif("fail to save your changes. the error is " + error)
            )
    }
    /*create a new slides*/
    createSlides() {
        this.slider = this._editor.slider;
        this.editorValid = this.slidesService.submitSlides(this.slider)
            .subscribe(
            data => {
                this.notifBarService.showNotif("create slides successfully!");
                this.router.navigate(['/slides']);
            },
            error => {
                this.notifBarService.showNotif("fail to create slides. the error is "+error);
            });
    };

}
