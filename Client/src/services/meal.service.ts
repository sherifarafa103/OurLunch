import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Meal } from '../models/meal.model';
import { BaseService } from '../services/base.service';
import { CacheService } from '../services/utils/cache.service';

@Injectable()
export class MealService {
    constructor(
        private _baseService: BaseService,
        private _cacheService: CacheService
    ) { }

    public get(restaurantId: number): Observable<Meal[]> {
        return <Observable<Meal[]>>this._cacheService.get(`${this._baseService.baseUrl}/restaurants/${restaurantId}/meals`, Meal.importFromApi);
    }

    public add(meal: Meal): Observable<number> {
        return this._cacheService.post(`${this._baseService.baseUrl}/meals`, meal);
    }

    public update(id: number, meal: Meal): Observable<void> {
        return this._cacheService.put(`${this._baseService.baseUrl}/meals/${id}`, meal);
    }

    public delete(id: number): Observable<void> {
        return this._cacheService.delete(`${this._baseService.baseUrl}/meals`, id);
    }
}
