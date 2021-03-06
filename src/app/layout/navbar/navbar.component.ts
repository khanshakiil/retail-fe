import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { User } from '../../_models';
import { AuthenticationService, MenuBarService } from '../../_services';
import { Menu } from '../../_models/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit{

  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private menuBarService : MenuBarService
) {
  
  this.currentUser = this.authenticationService.currentUserValue;

}
public get isAdmin(): boolean {
  return this.currentUser.role === 'ADMIN';
}

menu : Array<Menu> =[];

ngOnInit(){
  this.menu =  this.menuBarService.getMenu() ;
}

logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}
}
