import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';

@Injectable()
export class AppLoadService {

  constructor(private httpClient: HttpClient) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
          
          setTimeout(() => {
            //TODO load admin user temporary for demo purpose
            this.loadAdminUser();
            resolve();
          }, 1000);
        });
  }

  loadAdminUser(){
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.length === 0){
      var user :User = new User();
      
      user.id= 1;
      user.username= "admin";
      user.password= "123456";
      user.firstName= "Admin";
      user.lastName= "User";
      user.role = "ADMIN";

      localStorage.setItem('users', JSON.stringify([user]));
      }
  }
}