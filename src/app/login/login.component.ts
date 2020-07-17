import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService, MenuBarService } from '../_services';

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
    console.log('Login');
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
                    
                    this.menuBarService.getUserMenu()
                    .pipe(first())
                    .subscribe(menuId => {                  
                        console.log(menuId);
                       this.menuBarService.getAllMenu().subscribe(allMenu =>{

                             allMenu.forEach(menu => {
                                
                                var selectedSubMenu = menu.subMenu.filter(subMenu =>{
                                    return menuId.includes(subMenu.id);
                            });                                
                                menu.subMenu = selectedSubMenu;
                                console.log(menu);
                             });
                             allMenu = allMenu.filter(menu => menu.subMenu.length>0);                    
                            console.log(allMenu);
                            this.menuBarService.setMenu(allMenu);  
                            this.router.navigate([this.returnUrl]);
                        }); 
                    });
                },
                error => {
                    console.log(error)
                   // this.alertService.error(error);
                    this.errorMessage = error;
                    this.loading = false;
                });
    }
}
