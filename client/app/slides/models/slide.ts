export class Slide {
    index: number = 1;
    /* graph setting*/
    graph: string = 'noGraph'; //graph type
    data: any = undefined; //data for graph
    /* slide content*/
    text: string = ""; //content of slide
    /* slide layout*/
    pageLayout: string = 'textInCenter'; //pagelayout type
    /* full screen layout setting*/
    fullScreenHtml: string = ""; //full screen img html
    constructor() {

    }

}
