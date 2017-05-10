import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Slide } from '../../../models/slide'
@Component({
  selector: 'app-slide-preview',
  templateUrl: './slide-preview.component.html',
  styleUrls: ['./slide-preview.component.scss']
})
export class SlidePreviewComponent implements OnInit {
  @Input() curSlideIndex:number;
  @Input() slideSetting:Slide;
  @Output() submitSlideOpt:EventEmitter<Object>=new EventEmitter();
  @Output() deleteSlideOpt:EventEmitter<Object>=new EventEmitter();
  @Output() formValidateChange:EventEmitter<Object>=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  submitSlide(slide) {
    this.submitSlideOpt.emit(slide);
  }
  deleteSlide(index){
    this.deleteSlideOpt.emit(index);
  }
  validateChange(status){
    this.formValidateChange.emit(status);
  }

}
