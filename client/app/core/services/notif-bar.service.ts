import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class NotifBarService {

    constructor(private snackBar: MdSnackBar) {
    }

    showNotif(msg: string) {
        this.snackBar.open(msg, null, {
            duration: 4000,
        });
    }
}
