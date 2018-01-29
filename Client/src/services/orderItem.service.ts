import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { OrderItem } from '../models/orderItem.model';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OrderItemService {
    constructor(
        private _baseService: BaseService,
        private _httpService: Http
    ) { }

    public get(orderId: number): Observable<OrderItem[]> {
        return this._httpService.get(`${this._baseService.baseUrl}/orderItems/${orderId}`)
            .map(r => r.json());
    }

    public add(item: OrderItem): Observable<number> {
        return this._httpService.post(`${this._baseService.baseUrl}/orderItems`, item)
            .map(r => r.json());
    }
}
