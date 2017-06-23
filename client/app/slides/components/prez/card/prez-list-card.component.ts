import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Slides } from '../../../models/slides';
import { SlidesService } from '../../../services/slides.service';
import { MdDialog } from '@angular/material';
import { DialogComponent} from '../../dialog/dialog.component';
@Component({
  selector: 'app-prez-list-card',
  templateUrl: './prez-list-card.component.html',
  styleUrls: ['./prez-list-card.component.scss']
})
export class PrezListCardComponent implements OnInit {
  @Input() slides: Slides;
  @Input() editable: boolean; //whether the slides can be edited;
  @Output() deletedSlides = new EventEmitter();
  @select(['session', 'token']) loggedIn$: Observable<string>;
  @select(['session', 'user', 'username']) username$: Observable<Object>;

  constructor(private slidesService: SlidesService, private dialog: MdDialog) {
  }

  ngOnInit() {
  }

  open(e) {
    e.stopPropagation();
  }

  publish(e) {
    e.stopPropagation();
    this.slides.slidesSetting.public = !this.slides.slidesSetting.public;
    this.slidesService.updateSlide(this.slides, this.slides._id)
      .subscribe(elm => console.log(elm.slidesSetting.public));
  }
  toggleFavorite(e) {
    e.stopPropagation();
    this.slides.slidesSetting.favorite = !this.slides.slidesSetting.favorite;
    this.slidesService.updateSlide(this.slides, this.slides._id)
      .subscribe(elm => console.log(elm.slidesSetting.favorite));
  }
  /*delete the whole slides*/
  deleteSlides(e, id) {
    e.stopPropagation();
    const dialog = this.dialog.open(DialogComponent);
    dialog.afterClosed().subscribe(result => {
      if (result === 'YES') {
        this.slidesService.deleteSlides(id)
          .subscribe(res => {
            console.log("update succesfully");
            // this.router.navigate(['/slides']);
            this.deletedSlides.emit(id);
          },
          error => console.log(error));
      }
    });

  }
}
