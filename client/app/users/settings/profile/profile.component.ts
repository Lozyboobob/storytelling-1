import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../index';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { SessionActions } from '../../../core/actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../core/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  state :Object;
  constructor(private usersService : UsersService,
                private actions : SessionActions, private ngRedux: NgRedux<IAppState> ) {
     this.ngRedux.subscribe(() =>{
      this.state=this.ngRedux.getState();
    })
 
 }

  ngOnInit() {
    this.actions.getProfile();
   
  }
  saveProfile(user){
    this.actions.editProfile(user);
  }

}
