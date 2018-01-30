import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

    public get(orderId: number): Observable<OrderItem[]> {
        return <Observable<OrderItem[]>>this._cacheService.get(`${this._baseService.baseUrl}/orderItems/${orderId}`, OrderItem.importFromApi, null);
    }

    public add(item: OrderItem): Observable<number> {
        return this._cacheService.post(`${this._baseService.baseUrl}/orderItems`, item, null);
    }
}
