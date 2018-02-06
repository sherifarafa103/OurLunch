import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Order } from '../../models/order.model';
import { Restaurant } from '../../models/restaurant.model';
import { User } from '../../models/user.model';
import { OrderService } from '../../services/order.service';
import { RestaurantService } from '../../services/restaurant.service';
import { UserService } from '../../services/user.service';
import { OrderPage } from '../order/order.component';
import { CreateOrderPage } from '../create-order/create-order.component';

@Component({
    selector: 'active-orders-page',
    templateUrl: 'active-orders.component.html',
    providers: [DatePipe]
})
export class ActiveOrdersPage {
    public orders: Observable<Order[]>;
    public users: Observable<User[]>;
    public restaurants: Observable<Restaurant[]>;

    constructor(
        private _orderService: OrderService,
        private _userService: UserService,
        private _restaurantService: RestaurantService,
        private _navController: NavController,
        private _loadingController: LoadingController
    ) { }

    public ngOnInit(): void {
        this._initState();
    }

    public createOrder(): void {
        this._navController.push(CreateOrderPage, null, { animate: true });
    }

    public search(): void {
        this._getNewOrders();
    }

    public goToOrder(order: Order): void {
        this._navController.push(OrderPage, { order: order });
    }

    private _initState(): void {
        this._getNewOrders();
        this.users = this._userService.get();
        this.restaurants = this._restaurantService.get();
    }

    private _getNewOrders(): void {
        const loader = this._loadingController.create({ content: "Loading Orders" });
        this.orders = this._orderService.getActiveOrders(true)
            .map(orders => orders.sort((a, b) => a.time > b.time ? 1 : -1))
            .finally(() => loader.dismiss())
            .share();
    }
}
