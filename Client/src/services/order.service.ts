import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx'
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {

  constructor(private _httpService: Http) { }

 

  addOrder(order: Order) {
    return this._httpService.post('http://localhost:55013/api/orders', order);
  }

  GetOrders() {
    return this._httpService.get('http://localhost:55013/api/orders').map(r => r.json());
  }

  GetOrderById(orderId: number) {
    return this._httpService.get('http://localhost:55013/api/orders/${orderId}');
  }


  UpdateOrder(orderId: number,order: Order) {
   // return this._httpService.put(`http://localhost:55013/api/users/alias/${orderId}{order}`).map(r => r.json());

  }

  DeleteOrder(orderId: number) {
    return this._httpService.delete(`http://localhost:55013/api/users/alias/${orderId}`).map(r => r.json());
  
  }

}
