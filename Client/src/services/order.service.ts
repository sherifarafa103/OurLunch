import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Order } from '../models/order.model';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {
    constructor(
        private _baseService: BaseService,
        private _httpService: Http
    ) { }

    public get(): Observable<Order[]> {
        return this._httpService.get(`${this._baseService.baseUrl}/orders`)
            .map(r => r.json());
    }

    public getSingle(id: number): Observable<Order> {
        return this._httpService.get(`${this._baseService.baseUrl}/orders/${id}`)
            .map(r => r.json());
    }

    public add(order: Order): Observable<number> {
        return this._httpService.post(`${this._baseService.baseUrl}/orders`, order)
            .map(r => r.json());
    }

    public update(id: number, order: Order): Observable<void> {
        return this._httpService.put(`${this._baseService.baseUrl}/orders/${id}`, order)
            .map(r => r.json());
    }

    public delete(id: number): Observable<void> {
        return this._httpService.delete(`${this._baseService.baseUrl}/orders/${id}`)
            .map(r => r.json());
    }
}
