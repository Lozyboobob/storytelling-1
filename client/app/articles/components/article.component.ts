
import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from "../services";
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article : IArticle;

  constructor() { }

  ngOnInit() {
  }

}