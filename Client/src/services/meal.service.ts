import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx'
import { Meal } from '../models/meal.model';

@Injectable()
export class UserService {

  constructor(private _httpService: Http) { }

  signIn(alias: string) {
    return this._httpService.get(`http://localhost:55013/api/users/alias/${alias}`).map(r => r.json());
  }

  addMeal(meal: Meal) {
    return this._httpService.post('http://localhost:55013/api/users', meal);
  }

}
