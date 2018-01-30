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

    public get(): Observable<Order[]> {
        return <Observable<Order[]>>this._cacheService.get(`${this._baseService.baseUrl}/orders`, Order.importFromApi, null);
    }

    public getByDate(start: Date, end: Date): Observable<Order[]> {
        return <Observable<Order[]>>this._cacheService.get(`${this._baseService.baseUrl}/orders/time/${start.toISOString()}/${end.toISOString()}`, Order.importFromApi, null);
    }

    public add(order: Order): Observable<number> {
        return this._cacheService.post(`${this._baseService.baseUrl}/orders`, order, null);
    }

    public update(id: number, order: Order): Observable<void> {
        return this._cacheService.put(`${this._baseService.baseUrl}/orders/${id}`, order, null);
    }

    public delete(id: number): Observable<void> {
        return this._cacheService.delete(`${this._baseService.baseUrl}/orders`, id, null);
    }
}
