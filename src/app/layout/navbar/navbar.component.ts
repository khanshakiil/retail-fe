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

  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private menuBarService : MenuBarService
) {
  
    

}

menu : Array<Menu> =[];

ngOnInit(){
console.log('Menuuuuuuuuuuuuuuuuuu');
  this.menu =  this.menuBarService.getMenu() ;
  console.log(this.menu);


  // 
}

logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}

}
