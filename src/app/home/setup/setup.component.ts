﻿import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../_models';
import { MenuBarService, AlertService } from '../../_services';
import { first } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr'
import { Menu } from '../../_models/menu';

@Component({ templateUrl: 'setup.component.html' })
export class SetupComponent implements OnInit {
    currentUser: User;
    menus = [];
    menuForm: FormGroup;
    selectedMenu : Number[];    

    constructor(private formBuilder: FormBuilder,
        private menuBarService: MenuBarService,
        private toastrService : ToastrService,
        private alertService: AlertService
    ) {
        
    }

    ngOnInit() {
        this.menuForm = this.formBuilder.group({
            menuItem: new FormArray([])           
        });
        ;
        this.loadAllMenu();
        
    }
    private loadAllMenu() {
        this.menuBarService.getAllMenu()
            .pipe()
            .subscribe(menus =>{
              
               this.menus = menus ;
               
               this.filterMenu();
               
            });            
    }

    filterMenu(){
            
      this.selectedMenu =  JSON.parse(localStorage.getItem('selectedMenu'));
      if(!this.selectedMenu){
        this.selectedMenu = [];
        return;
      }

      const formArray: FormArray = this.menuForm.get('menuItem') as FormArray;
      
      this.menus.forEach(menu => {
        menu.subMenu.forEach(subMenu =>{
            this.selectedMenu.forEach(selectedmenu => {
                         if(subMenu.id == selectedmenu){   
                            (this.menuForm.controls.menuItem as FormArray)
                                  .push(new FormControl(selectedmenu));
                         }
            });
           });
        });
  }

    onSubmit(){
         this.menuBarService.saveMenu(this.menuForm.value.menuItem)
        .pipe(first())
        .subscribe(
            data => {
              this.alertService.success('Menu updated');
            },
            error => {
              this.toastrService.error(error);
            });
    }

    get ordersFormArray() {
        return this.menuForm.controls.menuItem as FormArray;
      }

    private addCheckboxes() {
        
      }

      
onCheckChange(event) {
    const formArray: FormArray = this.menuForm.get('menuItem') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(+event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
    console.log(formArray.value);
  }
}