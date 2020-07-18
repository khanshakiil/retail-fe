import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService, MenuBarService } from '../_services';
import { Menu } from '../_models/menu';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private menuBarService: MenuBarService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                   this.prepareMenu();                   
                },
                error => {
                    console.log(error)
                   // this.alertService.error(error);
                    this.errorMessage = error;
                    this.loading = false;
                });
    }

    prepareMenu(){
        this.menuBarService.getUserMenu()
        .pipe(first())
        .subscribe(userMenuIds => {                  
           this.menuBarService.getAllMenu().subscribe(allMenu =>{
           
                 this.menuBarService.setMenu( this.filterMenu(userMenuIds, allMenu));  
                
                this.router.navigate([this.returnUrl]);
            }); 
        });
    }

    filterMenu(menuId, allMenu): Menu[]{
        allMenu.forEach(menu => {
                                
            var selectedSubMenu = menu.subMenu.filter(subMenu =>{
                return menuId.includes(subMenu.id);
        });                                
            menu.subMenu = selectedSubMenu;
         });
         allMenu = allMenu.filter(menu => menu.subMenu.length>0);                    
        
        
       return allMenu;
    }

}
