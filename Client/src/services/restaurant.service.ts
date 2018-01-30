import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Restaurant } from '../models/restaurant.model';
import { BaseService } from '../services/base.service';
import { CacheService } from './utils/cache.service';

@Injectable()
export class RestaurantService {
    constructor(
        private _baseService: BaseService,
        private _cacheService: CacheService
    ) { }

    public get(): Observable<Restaurant[]> {
        return <Observable<Restaurant[]>>this._cacheService.get(`${this._baseService.baseUrl}/restaurants`, Restaurant.importFromApi, null);
    }

    public add(restaurant: Restaurant): Observable<number> {
        return this._cacheService.post(`${this._baseService.baseUrl}/restaurants`, restaurant, null);
    }

    public update(id: number, restaurant: Restaurant): Observable<void> {
        return this._cacheService.put(`${this._baseService.baseUrl}/restaurants`, restaurant, null);
    }

    public delete(id: number): Observable<void> {
        return this._cacheService.delete(`${this._baseService.baseUrl}/restaurants`, id, null);
    }
}
