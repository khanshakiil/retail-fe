import { Component } from '@angular/core';
import { User } from './_models';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
    //TODO temp add admin as initial load
    
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  
}
