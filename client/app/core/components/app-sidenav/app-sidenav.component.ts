import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';

import { ToggleNavService, MenuService } from '../../services';
import { IAppState } from '../../store';


@Component({
  selector: 'app-app-sidenav',
  templateUrl: './app-sidenav.component.html',
  styleUrls: ['./app-sidenav.component.scss'],

})
export class AppSidenavComponent implements OnInit {
  isNormalScreen: boolean = true;
  sideNavLock: boolean = false;
  isToggled: boolean;
  subscription: Subscription;
  //Menu Item
  menuList: Array<Object> = [];
  state:Object;
  @select(AppSidenavComponent.isLoggedIn) loggedIn$: Observable<boolean>;
  @ViewChild('sidenav') sidenav: ElementRef;
  constructor(private ToggleNavService: ToggleNavService, private ngRedux: NgRedux<IAppState>, private menuService : MenuService) {
    this.menuList =menuService.getMenu('sideNav').items;
    //subscribe toggle service
    this.subscription = this.ToggleNavService.toggle().subscribe(toggled => {
      this.isToggled = toggled;
    });
    this.state=this.ngRedux.getState();

  }
  ngOnInit() {
    this.ngRedux.subscribe(() =>{
      this.state=this.ngRedux.getState();
    })
  }
  static isLoggedIn(s){ return s.session.token; }
  ngAfterViewInit() {
    var sidenav = this.sidenav.nativeElement;
    if (this.getCookie("pin") == "true") {
      this.isToggled = true;
      this.sideNavLock = true;
    }
  }
  /* SideNav toggle operation*/
  toggleNav() {
    this.ToggleNavService.toggle();
  }
  /* Pin sideNav*/
  changePinStatus() {
    if (this.getCookie("pin") == "") {
      this.setCookie("pin", "true", 365);
      this.sideNavLock = true;
    } else {
      if (this.getCookie("pin") == "true") {
        this.setCookie("pin", "false", 365);
        this.sideNavLock = false;
        this.toggleNav();
      } else {
        this.setCookie("pin", "true", 365);
        this.sideNavLock = true;
      }
    }
    console.log("pin", document.cookie);
  }
  /*Cookie operation*/
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  clearCookie(cname) {
    this.setCookie("cname", "", -1);
  }

}
