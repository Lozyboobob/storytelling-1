import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { SessionActions } from '../core/actions';
import { Router } from '@angular/router';
import {TooltipPosition} from '@angular/material';
import { ToggleNavService } from '../toggle-nav.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent implements OnInit {
  @Input() titleToolbar: string;
  @select(s => !s.session.token) loggedIn$: Observable<boolean>;
  @select(s => !!s.session.token) loggedOut$: Observable<boolean>;
  isToggled: boolean;
  isNormalScreen: boolean = true;
  subscription: Subscription;
  menuList:Array<Object>= [];
  constructor(private router: Router,
    private actions: SessionActions, private ToggleNavService: ToggleNavService) {

    /* tool bar menu*/
    let itemArticle={
      state: 'article',
      title: 'Articles',
      icon: 'fa-user-secret',
      roles: ['*'],
      type:"button"
    }
    this.menuList.push(itemArticle);
  }
  /* SideNav toggle operation*/
  toggleNav() {
    this.ToggleNavService.toggle();
  }
  ngOnInit() {
    this.loggedIn$.subscribe(
      isLoggedIn => {
        if (isLoggedIn)
          this.router.navigate(['login']);
      },
      error => {
        this.router.navigate(['login']);
      });
      //subscribe toggle service
      this.subscription = this.ToggleNavService.toggle().subscribe(toggled => {
        this.isToggled = toggled;
      });
  }

  logout() {
    var toto = this.actions.logoutUser();
    console.log('toot:', toto);
  }

}
