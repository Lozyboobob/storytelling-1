
import {Component, Input} from '@angular/core'

@Component({
    selector: 'image',
    template: `
      <img [src]="path" class="fullScreenImg">

  `,
})
export class ImageComponent {
    @Input() path: string;

}
