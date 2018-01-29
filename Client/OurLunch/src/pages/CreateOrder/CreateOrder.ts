import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'CreateOrder',
  templateUrl: 'CreateOrder.html'
})
export class CreateOrderPage {
  public owner: number;
  public restaurantId: number;
  public time: Date;
  public id: number;
  constructor(public navCtrl: NavController, private _orderService: OrderService) {
  }

  onKeyPress(event): void {
    console.log(event);
  }

  addOrder() {
    var o = new Order(this.owner, this.restaurantId, this.time);
    this._orderService.addOrder(o).subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  }

  getOrders(id: number) {
    this._orderService.GetOrders().subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  }

  getOrderbyId(id: number) {
    this._orderService.GetOrders().subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  }


  updateOrder(id: number) {
    this._orderService.DeleteOrder(id).subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  }

  deleteOrder(id: number) {
    this._orderService.DeleteOrder(id).subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  }

}
