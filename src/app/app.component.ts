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
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.length === 0){
      var user :User = new User();
      
      user.id= 1;
      user.username= "shakil";
      user.password= "1234";
      user.firstName= "Shakil";
      user.lastName= "Khan";
      user.role = "ADMIN"
      console.log(JSON.stringify([user]))
     
      localStorage.setItem('users', JSON.stringify([user]));
      console.log("Add User");
      }
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  
}
