import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appScroll]'
})
export class ScrollDirective {
    scrollPose: number = 1250; // scroll in same direction won't be triggered repeatedly inside <number> second
    private enableScroll: boolean = true;
    @Output() mouseWheelUp = new EventEmitter();
    @Output() mouseWheelDown = new EventEmitter();

    @HostListener('mousewheel', ['$event'])
    onMouseWheelChrome(event: any) {
        this.mouseWheelFunc(event);
    }

    @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
        this.mouseWheelFunc(event);
    }

    @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
        this.mouseWheelFunc(event);
    }
    constructor() {

    }

    mouseWheelFunc(event: any) {
        var event = window.event || event; // old IE support
        // for IE
        event.returnValue = false;
        // for Chrome and Firefox
        if (event.preventDefault) {
            event.preventDefault();
        }
        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        if (delta > 0) {
            this.mouseWheelUp.emit();
        } else if (delta < 0) {
            this.mouseWheelDown.emit();
        }



    }
}
