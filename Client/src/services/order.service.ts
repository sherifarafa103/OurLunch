import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order.model';
import { BaseService } from '../services/base.service';
import { CacheService } from '../services/utils/cache.service';

@Injectable()
export class OrderService {
    constructor(
        private _baseService: BaseService,
        private _cacheService: CacheService
    ) { }

    public getActiveOrders(refresh: boolean = false): Observable<Order[]> {
        const start: Date = new Date();
        const end: Date = new Date();
        end.setDate(end.getDate() + 1);

        return <Observable<Order[]>>this._cacheService.get(
            `${this._baseService.baseUrl}/orders/time/${start.toISOString()}/${end.toISOString()}/`,
            Order.importFromApi,
            refresh,
            `${this._baseService.baseUrl}/orders`
        );
    }

    public getByDate(start: Date = null, end: Date = null): Observable<Order[]> {
        if (start === null && end === null) {
            start = new Date();
            end = new Date();

            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
        }

        return <Observable<Order[]>>this._cacheService.get(
            `${this._baseService.baseUrl}/orders/time/${start.toISOString()}/${end.toISOString()}/`,
            Order.importFromApi,
            true,
            `${this._baseService.baseUrl}/orders`
        );
    }

    public add(order: Order, local: boolean = false): Observable<number> {
        return this._cacheService.post(`${this._baseService.baseUrl}/orders`, order, local);
    }

    public update(order: Order, local: boolean = false): Observable<void> {
        return this._cacheService.put(`${this._baseService.baseUrl}/orders`, order, local);
    }

    public delete(order: Order, local: boolean = false): Observable<void> {
        return this._cacheService.delete(`${this._baseService.baseUrl}/orders`, order.id, local);
    }
}
