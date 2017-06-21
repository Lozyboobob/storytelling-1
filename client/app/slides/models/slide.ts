export class Slide {
    index: number = 1;
    /* graph setting*/
    graph: string = 'noGraph'; //graph type
    data: any = undefined; //data for graph
    config: any = undefined; // config for graph
    /* slide content*/
    text: string = ""; //content of slide
    /* slide layout*/
    pageLayout: string = ''; //pagelayout type
    /* full screen layout setting*/
    fullScreenHtml: string = ""; //full screen img html
    /* indecator for text and graph*/
    hasGraph:boolean=false;
    hasText:boolean=false;
    pageTitle:any={
      title:"",
      align:""
    }
    constructor(index ? :number) {
      if(index) this.index=index;
    }

}
