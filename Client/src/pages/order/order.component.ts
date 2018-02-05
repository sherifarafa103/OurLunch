import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavParams } from 'ionic-angular';
import { Order } from '../../models/order.model';
import { UserService } from '../../services/user.service';
import { RestaurantService } from '../../services/restaurant.service';
import { MealService } from '../../services/meal.service';
import { Observable } from 'rxjs/Rx';
import { Restaurant } from '../../models/restaurant.model';
import { User } from '../../models/user.model';
import { Meal } from '../../models/meal.model';
import { OrderItem } from '../../models/orderItem.model';
import { OrderItemService } from '../../services/orderItem.service';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { Modal } from 'ionic-angular/components/modal/modal';
import { ItemPopover } from './item-popover/item-popover.component';
import { OrderService } from '../../services/order.service';
import { SettingsPopover } from './settings-popover/settings-popover.component';

export interface IUserOrderItems {
    userId: number;

    orderItems: OrderItem[];
}

@Component({
    selector: 'order-page',
    templateUrl: 'order.component.html',
    providers: [DatePipe]
})
export class OrderPage {
    public order: Order;
    public tax: number = 0;
    public delivery: number = 0;

    public restaurant: Observable<Restaurant>;
    public users: Observable<User[]>;
    public meals: Observable<Meal[]>;
    public user: Observable<User>;
    public time: Observable<string>;
    public userItems: Observable<IUserOrderItems[]>;

    constructor(
        private _navParams: NavParams,
        private _restaurantService: RestaurantService,
        private _mealService: MealService,
        private _userService: UserService,
        private _orderItemService: OrderItemService,
        private _modalController: ModalController,
        private _orderService: OrderService,
        private _datePipe: DatePipe
    ) { }

    public ngOnInit(): void {
        this._initState();
    }

    public updateOrder(): void {
        this.order.tax = this.tax;
        this.order.delivery = this.delivery;

        this._orderService.update(this.order.id, this.order)
            .subscribe();
    }

    public openSettingsModal(event: Event): void {
        const orderClone: Order = new Order(
            this.order.id,
            this.order.userId,
            this.order.restaurantId,
            this.order.time,
            this.order.tax,
            this.order.delivery
        );
        const modal: Modal = this._modalController.create(SettingsPopover, { order: orderClone });
        modal.present({ ev: event });

        modal.onDidDismiss(order => {
            if (order) {
                this._orderService.update(order.id, order)
                    .subscribe(() => this.order = order);
            }
        });
    }

    public openItemModal(event: Event): void {
        const modal: Modal = this._modalController.create(ItemPopover, { restaurantId: this.order.restaurantId, orderId: this.order.id });
        modal.present({ ev: event });

        modal.onDidDismiss(item => {
            if (item) {
                this._orderItemService.add(item)
                    .subscribe();
            }
        });
    }

    public calculateTotal(userItem: IUserOrderItems): number {
        const itemsPrices: number = userItem.orderItems.reduce((acc, val) => acc + val.price * val.quantity, 0);
        return itemsPrices + (itemsPrices * this.tax) / 100;
    }

    private _initState(): void {
        this.order = this._navParams.get('order');

        this.restaurant = this._restaurantService.get()
            .map(restaurants => restaurants.find(r => r.id === this.order.restaurantId));

        this.users = this._userService.get();

        this.user = this.users.map(users => users.find(u => u.id === this.order.userId));

        this.meals = this._mealService.get(this.order.restaurantId);

        this.userItems = this._orderItemService.get(this.order.id).map(orderItems => {
            const userMap: Map<number, OrderItem[]> = new Map<number, OrderItem[]>();

            orderItems.forEach(item => {
                if (userMap.has(item.userId)) {
                    userMap.get(item.userId).push(item);
                }
                else {
                    userMap.set(item.userId, [item]);
                }
            });

            return Array.from(userMap.entries()).map(entry => ({ userId: entry[0], orderItems: entry[1] }));
        });

        this.time = Observable.timer(0, 60000)
            .map(() => {
                const now: Date = new Date();
                const orderTime: Date = this.order.time;

                return orderTime > now ?
                    `${this._getMinuteDifference(orderTime, now)} mins`
                    : `${this._datePipe.transform(orderTime, 'short')}`;
            });
    }

    private _getMinuteDifference(date2: Date, date1: Date) {
        var diff = (date2.getTime() - date1.getTime()) / 1000;
        diff /= 60;

        return Math.abs(Math.round(diff));
    }
}
