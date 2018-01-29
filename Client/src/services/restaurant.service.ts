import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Restaurant } from '../models/restaurant.model';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RestaurantService {
    constructor(
        private _baseService: BaseService,
        private _httpService: Http
    ) { }

    public get(): Observable<Restaurant[]> {
        return this._httpService.get(`${this._baseService.baseUrl}/restaurants`)
            .map(r => r.json());
    }

    public add(restaurant: Restaurant): Observable<number> {
        return this._httpService.post(`${this._baseService.baseUrl}/restaurants`, restaurant)
            .map(r => r.json());
    }

    public update(id: number, restaurant: Restaurant): Observable<void> {
        return this._httpService.post(`${this._baseService.baseUrl}/restaurants/${id}`, restaurant)
            .map(r => r.json());
    }

    public delete(id: number): Observable<void> {
        return this._httpService.delete(`${this._baseService.baseUrl}/restaurants/${id}`)
            .map(r => r.json());
    }
}
