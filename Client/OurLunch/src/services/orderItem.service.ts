import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx'
import { OrderItem } from '../models/orderItem.model';

@Injectable()
export class OrderItemService {

  constructor(private _httpService: Http) { }

  //signIn(alias: string) {
  //return this._httpService.get(`http://localhost:55013/api/users/alias/${alias}`).map(r => r.json());
  //}

  addOrderItem(orderItem: OrderItem) {
    return this._httpService.post('http://localhost:55013/api/orderItems', orderItem);
  }

  getOrderItems() {
    return this._httpService.get('http://localhost:55013/api/orderItems');
  }

}
