import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Meal } from '../models/meal.model';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MealService {
    constructor(
        private _baseService: BaseService,
        private _httpService: Http
    ) { }

    public get(restaurantId: number): Observable<Meal[]> {
        return this._httpService.get(`${this._baseService.baseUrl}/restaurants/${restaurantId}/meals`)
            .map(r => r.json());
    }

    public add(meal: Meal): Observable<number> {
        return this._httpService.post(`${this._baseService.baseUrl}/meals`, meal)
            .map(r => r.json());
    }

    public update(id: number, meal: Meal): Observable<void> {
        return this._httpService.post(`${this._baseService.baseUrl}/meals/${id}`, meal)
            .map(r => r.json());
    }

    public delete(id: number): Observable<void> {
        return this._httpService.delete(`${this._baseService.baseUrl}/meals/${id}`)
            .map(r => r.json());
    }
}
