import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { SlidesService } from '../../../../services/slides.service'

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef
    @ViewChild('fileDisplayArea') fileDisplayArea: ElementRef;
    @ViewChild('form') form: ElementRef;
    @Output() setImage: EventEmitter<any> = new EventEmitter();
    @Input() label="Choose Image";
    image: any = undefined;
    constructor(private slidesService: SlidesService) { }

    ngOnInit() {
    }

    newInput(e) {
        let fileInput = this.fileInput.nativeElement;

        let file = fileInput.files[0];

        let textType = /image.*/;
        console.log(file.type.match(textType));

        if (file.type.match(textType)) {
            var reader: any = new FileReader();

            reader.onload = (e) => {
                console.log("going to append", e.target);

                //append preview
                this.fileDisplayArea.nativeElement.src = e.target.result;
                //upload image
                let img = {
                    data: file,
                    contentType: 'image/*'
                }
                this.slidesService.uploadImage(file)
                    .subscribe(
                    res => {

                        this.setImage.emit(res.link);
                        //this.router.navigate(['/login']);
                        //this.router.navigate(['/slides']);
                    },
                    error => {
                        console.log("fail to createSlides");
                    });

            }

            reader.readAsDataURL(file);
        } else {
            console.log("the file format is not correct")
        }

    }
}
