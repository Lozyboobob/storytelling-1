import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TooltipPosition} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux, select } from '@angular-redux/store';

import { ToggleNavService, MenuService } from '../../services';
import { IAppState } from '../../store';
import { SessionActions } from '../../actions';


@Component({
  selector: 'app-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {
  @Input() titleToolbar: string;
  @select(AppToolbarComponent.isLoggedIn) loggedIn$: Observable<boolean>;
  @select(AppToolbarComponent.isLoggedOut) loggedOut$: Observable<boolean>;

  isToggled: boolean;
  isNormalScreen: boolean = true;
  subscription: Subscription;
  menuList:Array<Object>= [];
  state:Object;
  returnUrl: string;

  constructor(private router: Router,private menuService : MenuService, private route: ActivatedRoute,
    private actions: SessionActions,private ngRedux: NgRedux<IAppState>, private ToggleNavService: ToggleNavService) {
      this.state=this.ngRedux.getState();
      this.menuList =menuService.getMenu('toolBar').items;
  }
  /* SideNav toggle operation*/
  toggleNav() {
    this.ToggleNavService.toggle();
  }
  ngOnInit() {
    this.ngRedux.subscribe(() =>{
      this.state=this.ngRedux.getState();
    })
      //subscribe toggle service
      this.subscription = this.ToggleNavService.toggle().subscribe(toggled => {
        this.isToggled = toggled;
      });
  }
  logout() {
   this.actions.logoutUser();
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   this.router.navigate([this.returnUrl]);
  }

  static isLoggedIn(s){ return s.session.token; }
  static isLoggedOut(s){ return !s.session.token; }

}
