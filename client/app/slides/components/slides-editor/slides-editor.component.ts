import { Component, OnInit,Output } from '@angular/core';
import { Slides} from '../../models/slides';
@Component({
  selector: 'app-slides-editor',
  templateUrl: './slides-editor.component.html',
  styleUrls: ['./slides-editor.component.scss']
})
export class SlidesEditorComponent implements OnInit {
  //@Output() slides:Slides
  constructor() { }

  ngOnInit() {
  }

}
