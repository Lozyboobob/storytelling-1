import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {EqualValidator} from './equal-validator.directive';
import { SessionActions } from '../../../core/actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../core/store';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  form: FormGroup;
  state :Object;

  constructor(private actions : SessionActions, private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.subscribe(() =>{
      this.state=this.ngRedux.getState();
      console.log('state',this.state)
    })
    this.form = this._buildForm();
  }

  ngOnInit() {
  }
  private _buildForm() {
    return new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      verifyPassword: new FormControl('', Validators.required)
    });
  }
  changePasword(value){
    this.actions.changePassword(value);
  }
}
