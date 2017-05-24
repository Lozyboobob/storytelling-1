import { Component, OnInit,Input } from '@angular/core';
import { select } from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import { Slides} from '../../models/slides';
import {SlidesService} from '../../services/slides.service';
@Component({
  selector: 'app-slides-card',
  templateUrl: './slides-card.component.html',
  styleUrls: ['./slides-card.component.scss']
})
export class SlidesCardComponent implements OnInit {
  @Input() slides:Slides;
  @Input() editable:boolean; //whether the slides can be edited;
  @select(['session', 'token']) loggedIn$: Observable<string>;
  @select(['session', 'user', 'username']) username$: Observable<Object>;
  constructor(private slidesService: SlidesService) { }

  ngOnInit() {
  }
  publish(e) {
      this.slides.slidesSetting.public = !this.slides.slidesSetting.public;
      this.slidesService.updateSlide(this.slides, this.slides._id)
          .subscribe(elm => console.log(elm.slidesSetting.public));
  }
}
