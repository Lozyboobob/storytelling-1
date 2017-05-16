import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    @Output() textSearch = new EventEmitter();

    constructor() {
    }

    onChange(textToSearch) {
        if (textToSearch) {
            this.textSearch.emit(textToSearch);
        } else {
            this.textSearch.emit('');
        }
    }
    ngOnInit() {}

}
