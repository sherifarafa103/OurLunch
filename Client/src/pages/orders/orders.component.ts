import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Order } from '../../models/order.model';
import { Restaurant } from '../../models/restaurant.model';
import { User } from '../../models/user.model';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { RestaurantService } from '../../services/restaurant.service';
import { OrderPage } from '../order/order.component';

@Component({
    selector: 'orders-page',
    templateUrl: 'orders.component.html'
})
export class OrdersPage {
    public startFilter: string;
    public endFilter: string;
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

    public onDateChange(): void {
        this._getNewOrders();
    }

    public goToOrder(order: Order): void {
        this._navController.setRoot(OrderPage, { order: order });
    }

    private _initState(): void {
        this._initDateFilters();
        this._getNewOrders();
        this.users = this._userService.get();
        this.restaurants = this._restaurantService.get();
    }

    private _initDateFilters(): void {
        const startOfDay: Date = new Date();
        const endOfday: Date = new Date();

        startOfDay.setHours(0, 0, 0, 0);
        endOfday.setHours(23, 59, 59, 999);

        this.startFilter = startOfDay.toISOString();
        this.endFilter = endOfday.toISOString();
    }

    private _getNewOrders(): void {
        const loader = this._loadingController.create({ content: "Loading Orders" });
        this.orders = this._orderService.getByDate(new Date(this.startFilter), new Date(this.endFilter))
            .finally(() => loader.dismiss());
    }
}
