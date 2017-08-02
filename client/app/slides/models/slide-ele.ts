export class SlideEle {
    index:number=0;
    type:string;
    constructor(index?: number,type?: string) {
        if (index) this.index = index;
        if (type) this.type=type;
    }

}
