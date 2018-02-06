import { Injectable } from '@angular/core';
import { OrderItem } from '../models/orderItem.model';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs/Rx';
import { CacheService } from './utils/cache.service';

@Injectable()
export class OrderItemService {
    constructor(
        private _baseService: BaseService,
        private _cacheService: CacheService
    ) { }

    public get(orderId: number, refresh: boolean = false): Observable<OrderItem[]> {
        return <Observable<OrderItem[]>>this._cacheService.get(`${this._baseService.baseUrl}/orderItems/${orderId}`, OrderItem.importFromApi, refresh);
    }

    public add(item: OrderItem, local: boolean = false): Observable<number> {
        if (local) {
            return this._cacheService.post(`${this._baseService.baseUrl}/orderItems/${item.orderId}`, item, true);
        }

        return this._cacheService.post(`${this._baseService.baseUrl}/orderItems`, item)
            .do(() => this._cacheService.post(`${this._baseService.baseUrl}/orderItems/${item.orderId}`, item, true));
    }

    public update(item: OrderItem, local: boolean = false): Observable<void> {
        if (local) {
            return this._cacheService.put(`${this._baseService.baseUrl}/orderItems/${item.orderId}`, item, true);
        }

        return this._cacheService.put(`${this._baseService.baseUrl}/orderItems`, item)
            .do(() => this._cacheService.put(`${this._baseService.baseUrl}/orderItems/${item.orderId}`, item, true));
    }

    public delete(item: OrderItem, local: boolean = false): Observable<void> {
        if (local) {
            return this._cacheService.delete(`${this._baseService.baseUrl}/orderItems/${item.orderId}`, item.id, true);
        }

        return this._cacheService.delete(`${this._baseService.baseUrl}/orderItems`, item.id)
            .do(() => this._cacheService.delete(`${this._baseService.baseUrl}/orderItems/${item.orderId}`, item.id, true));
    }
}
