import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { Menu } from '../_models/menu';

@Injectable({ providedIn: 'root' })
export class MenuBarService {
    private menuBarSubject = new BehaviorSubject<Array<Menu>>(null);
    menu : Array<Menu> =[];

    constructor(private http: HttpClient) {
        console.log('cons');
      }

    getUserMenu() {       
         
        return this.http.get<Number[]>(`/getMenu`);
    }
    
    getAllMenu():Observable<Menu[]> {
        console.log('All menu');
        return this.http.get<Menu[]>(`/assets/all-menu.json`);
    }

    getMenu(){
        console.log('gggettt');
        return this.menuBarSubject.value;
    }

    setMenu(menu:Menu[]) {       
       
            console.log(menu);
            this.menuBarSubject.next(menu);    
        console.log('Settt');
        
    }

    saveMenu(selectedMenuId : Array<Number>){
        console.log(selectedMenuId);
        return this.http.post(`/saveMenu`, selectedMenuId);             
    }
}
