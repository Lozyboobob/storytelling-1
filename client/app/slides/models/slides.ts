import {Slide} from './slide';
import {SlidesSetting} from './slides-setting';
export class Slides {
    _id: string;
    slidesSetting: SlidesSetting;
    slides: Array<Slide> = [];
    constructor(slides ?:Slides ) {
      //for copy slides
        this.slidesSetting=slides.slidesSetting;
        this.slidesSetting.title=this.slidesSetting.title+" "+"copy"
        this.slides=slides.slides;
    }
}
