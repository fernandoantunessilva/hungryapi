import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URL_API } from '../../app.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectedItem } from 'src/app/selected-item/selected-item.model';

@Injectable()
export class MenuService {

    constructor(private http: Http) { }

        getMenu(): Observable<any>  {
              return this.http.get(`${URL_API}/menu`)
                .pipe(map(responce=>responce.json()));
        }  
        
        getItemById(id: number): Observable<SelectedItem>  {
            return this.http.get(`${URL_API}/menu/${id}`)
              .pipe(map(responce=>responce.json()));
      }
}
