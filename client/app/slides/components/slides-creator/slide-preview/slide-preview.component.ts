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
  constructor() { }

  ngOnInit() {
  }
  submitSlide(slide) {
    this.submitSlideOpt.emit(slide);
  }

}
