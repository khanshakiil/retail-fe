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
        
      }

    getUserMenu() {       
        return this.http.get<Number[]>(`/getMenu`);
    }
    
    getAllMenu():Observable<Menu[]> {
        return this.http.get<Menu[]>(`/assets/all-menu.json`);
    }

    getMenu(){
        return this.menuBarSubject.value;
    }

    setMenu(menu:Menu[]) {       
            this.menuBarSubject.next(menu);    
    }

    saveMenu(selectedMenuId : Array<Number>){
        return this.http.post(`/saveMenu`, selectedMenuId);             
    }
}
