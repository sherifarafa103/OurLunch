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

@Component({
    selector: 'orders-page',
    templateUrl: 'orders.component.html',
    providers: [DatePipe]
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

    public search(): void {
        this._getNewOrders();
    }

    public goToOrder(order: Order): void {
        this._navController.push(OrderPage, { order: order });
    }

    public isActive(order: Order): boolean {
        return order.time > new Date();
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

        this.startFilter = this._toLocalTimezone(startOfDay);
        this.endFilter = this._toLocalTimezone(endOfday);
    }

    private _getNewOrders(): void {
        const loader = this._loadingController.create({ content: "Loading Orders" });
        this.orders = this._orderService.getByDate(new Date(this.startFilter), new Date(this.endFilter))
            .map(orders => orders.sort((a, b) => {
                const now: Date = new Date();

                if (a.time > now && b.time > now) {
                    return a.time > b.time ? 1 : -1;
                }

                return a.time < b.time ? 1 : -1;
            }))
            .finally(() => loader.dismiss())
            .share();
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
