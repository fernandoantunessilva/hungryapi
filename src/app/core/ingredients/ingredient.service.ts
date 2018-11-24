import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URL_API } from '../../app.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from 'src/app/selected-item/ingredient.model';

@Injectable()
export class IngredientService {

    constructor(private http: Http) { }

        getIngredientes(): Observable<Array<Ingredient>>  {
              return this.http.get(`${URL_API}/ingredients`)
                .pipe(map(responce=>responce.json()));
        } 
}
