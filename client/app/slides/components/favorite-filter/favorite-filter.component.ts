import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite-filter',
  templateUrl: './favorite-filter.component.html',
  styleUrls: ['./favorite-filter.component.scss']
})
export class FavoriteFilterComponent implements OnInit {
  @Output() filterFavorite = new EventEmitter();
  @Input() selectedValue = '';

  constructor() { }

  ngOnInit() {
  }
  onChange(isFavorite) {
    this.filterFavorite.emit(isFavorite);
  }
}
