import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-csv-input',
    templateUrl: './csv-input.component.html',
    styleUrls: ['./csv-input.component.scss']
})
export class CsvInputComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef
    @ViewChild('fileDisplayArea') fileDisplayArea: ElementRef
    constructor() { }
    @Output() csv2json: EventEmitter<any>=new EventEmitter();
    ngOnInit() {



    }

    //var csv is the CSV file with headers
    csvJSON(csv) {
        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {

            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);

        }

        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
    }

    newInput(e) {
        let fileInput = this.fileInput.nativeElement;
        let fileDisplayArea = this.fileDisplayArea.nativeElement;
        let file = fileInput.files[0];
        let textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = (e) => {
                //transfer to json
                let json = this.csvJSON(reader.result);
                this.csv2json.emit(json);
                fileDisplayArea.innerText = reader.result;
            }

            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    }
}
