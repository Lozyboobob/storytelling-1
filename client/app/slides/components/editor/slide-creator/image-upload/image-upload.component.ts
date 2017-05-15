import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { SlidesService } from '../../../../services/slides.service';
import { FileUploader} from 'ng2-file-upload';
import {Http } from '@angular/http';
const URL = 'localhost:3000/api/images/';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('fileDisplayArea') fileDisplayArea: ElementRef;
    @ViewChild('form') form: ElementRef;
    @Output() setImage: EventEmitter<any> = new EventEmitter();
    @Output() uploadImage: EventEmitter<any> = new EventEmitter();

    @Input() label = 'Choose Image';
    public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'banner'});

    image: any = undefined;
    constructor(private el: ElementRef) {
    }
    ngOnInit() {
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log( 'ImageUpload:uploaded:', item, status, response);
        };
    }
    onChange () {
        const inputEl = this.el.nativeElement.querySelector('#banner');
        console.log('étape 1');
        this.uploadImage.emit(inputEl);
    }
}
