import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderItemService } from '../../services/orderItem.service';
import { OrderItem } from '../../models/orderItem.model';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';


@Component({
  selector: 'MakeOrderItem',
  templateUrl: 'MakeOrderItem.html'
})
export class MakeOrderItemPage {
  public orderId: number;
  public userId: number;
  public mealId: Date;
  public id: number;
  public orders;

  constructor(public navCtrl: NavController, private _orderItemService: OrderItemService, private _orderService: OrderService) {
  }

  onKeyPress(event): void {
    console.log(event);
  }

  viewOrders() {
    this.orders = this._orderService.GetOrders();
  }


  addOrderItem() {
    var i = new OrderItem(this.orderId, this.userId, this.mealId);
    this._orderItemService.addOrderItem(i).subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  }

  getOrderItems() {
    this._orderItemService.getOrderItems().subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  }

  //getOrderbyId(id: number) {
  //  this._orderService.GetOrders().subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  //}


  //updateOrder(id: number) {
  //  this._orderService.DeleteOrder(id).subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  //}

  //deleteOrder(id: number) {
  //  this._orderService.DeleteOrder(id).subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  //}


  public orderTable1: Order;

  onSelect(orderTable2: Order): void {
    this.orderTable1 = orderTable2;
  }
}
