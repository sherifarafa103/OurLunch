import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Meal } from '../models/meal.model';
import { BaseService } from '../services/base.service';
import { CacheService } from '../services/utils/cache.service';
import { HttpService } from '../services/utils/http.service';

@Injectable()
export class MealService {
    constructor(
        private _baseService: BaseService,
        private _httpService: HttpService,
        private _cacheService: CacheService
    ) { }

    public get(restaurantId: number, refresh: boolean = false): Observable<Meal[]> {
        return <Observable<Meal[]>>this._cacheService.get(`${this._baseService.baseUrl}/restaurants/${restaurantId}/meals`, Meal.importFromApi, refresh);
    }

    public add(meal: Meal): Observable<number> {
        return this._httpService.post(`${this._baseService.baseUrl}/meals`, meal)
            .do(() => this._cacheService.post(`${this._baseService.baseUrl}/restaurants/${meal.restaurantId}/meals`, meal, true));
    }

    public update(id: number, meal: Meal): Observable<void> {
        return this._httpService.put(`${this._baseService.baseUrl}/meals/${id}`, meal)
            .do(() => this._cacheService.put(`${this._baseService.baseUrl}/restaurants/${meal.restaurantId}/meals`, meal, true));
    }

    public delete(meal: Meal): Observable<void> {
        return this._httpService.delete(`${this._baseService.baseUrl}/meals/${meal.id}`)
            .do(() => this._cacheService.delete(`${this._baseService.baseUrl}/restaurants/${meal.restaurantId}/meals`, meal.id, true));

    }
}
