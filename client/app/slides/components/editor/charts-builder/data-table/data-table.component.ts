import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private data: any[] = [{id: '1',  first: '', last: '', address: 'adress'}];

  private colHeaders: string[] = ['ID', 'First Name', 'Last Name', 'Address', 'Address2','Address3','Address4','Address5','Address6','Address7','Address8'];
  private columns: any[] = [
    {
      data: 'id'
    },
    {
      data: 'first',
      renderer: 'text',
      readOnly: true
    },
    {
      data: 'last',
      readOnly: true
    },
    {
      data: 'address'
    },
    {
      data: 'address2'
    },
    {
      data: 'address3'
    },
    {
      data: 'address4'
    },
    {
      data: 'address5'
    },
    {
      data: 'address6'
    },
    {
      data: 'address7'
    },
    {
      data: 'address8'
    }
  ];
  private options: any = {
    stretchH: 'all',
    // columnSorting: true,
    // contextMenu: [
    //   'row_above', 'row_below', 'remove_row'
    // ]
  };

  private afterChange(e: any) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }

  private afterOnCellMouseDown(e: any) {
    // tslint:disable-next-line:no-console
    console.log(e);
  }



}
