import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order.model';
import { BaseService } from '../services/base.service';
import { HttpService } from '../services/utils/http.service';
import { CacheService } from '../services/utils/cache.service';

@Injectable()
export class OrderService {
    constructor(
        private _baseService: BaseService,
        private _httpService: HttpService,
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

    public getByDate(start: Date, end: Date): Observable<Order[]> {
        return <Observable<Order[]>>this._httpService.get(`${this._baseService.baseUrl}/orders/time/${start.toISOString()}/${end.toISOString()}/`)
            .map(data => data.map(d => Order.importFromApi(d)));
    }

    public add(order: Order): Observable<number> {
        return this._cacheService.post(`${this._baseService.baseUrl}/orders`, order);
    }

    public update(id: number, order: Order): Observable<void> {
        return this._cacheService.put(`${this._baseService.baseUrl}/orders`, order);
    }

    public delete(id: number): Observable<void> {
        return this._cacheService.delete(`${this._baseService.baseUrl}/orders`, id);
    }

    private _toLocalTimezone(date: Date): string {
        let pad = n => n < 10 ? '0' + n : n;
        let tz = date.getTimezoneOffset();
        let tzs = `${(tz > 0 ? "-" : "+")}${pad(parseInt(<any>Math.abs(tz / 60)))}`;

        if (tz % 60 != 0)
            tzs += pad(Math.abs(tz % 60));

        if (tz === 0) {
            tzs = 'Z';
        }

        return date.getFullYear() + '-'
            + pad(date.getMonth() + 1) + '-'
            + pad(date.getDate()) + 'T'
            + pad(date.getHours()) + ':'
            + pad(date.getMinutes());
    }
}
