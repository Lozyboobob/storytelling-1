

export class SlidesListItem {
    id: string='';
    title: string='';
    description: string='';
    tags: Array<string>=[];
    bannerPath:String='';
    constructor(slides?) {
      this.id=slides && slides._id || '';
      this.title= slides && slides.title|| '';
      this.description= slides && slides.description|| '';
      this.tags=slides && slides.tags|| [];
      this.bannerPath=slides && slides.bannerPath|| '';
    }
}
