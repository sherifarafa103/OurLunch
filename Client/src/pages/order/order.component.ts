import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Order } from '../../models/order.model';
import { UserService } from '../../services/user.service';
import { RestaurantService } from '../../services/restaurant.service';
import { MealService } from '../../services/meal.service';
import { Observable } from 'rxjs/Rx';
import { Restaurant } from '../../models/restaurant.model';
import { User } from '../../models/user.model';
import { Meal } from '../../models/meal.model';

@Component({
    selector: 'order-page',
    templateUrl: 'order.component.html'
})
export class OrderPage {
    public order: Order;
    public restaurant: Observable<Restaurant>;
    public users: Observable<User[]>;
    public meals: Observable<Meal[]>;
    public user: Observable<User>;
    public time: Observable<number>;

    constructor(
        private _navParams: NavParams,
        private _restaurantService: RestaurantService,
        private _mealService: MealService,
        private _userService: UserService
    ) { }

    public ngOnInit(): void {
        this._initState();
    }

    private _initState(): void {
        this.order = this._navParams.get('order');
        this.restaurant = this._restaurantService.get()
            .map(restaurants => restaurants.find(r => r.restaurantId === this.order.restaurantId));

        this.users = this._userService.get();

        this.meals = this._mealService.get(this.order.restaurantId);

        this.user = this.users.map(users => users.find(u => u.userId === this.order.userId));

        this.time = Observable.timer(0, 60000)
            .map(() => this._getMinuteDifference(this.order.time, new Date()));
    }

    private _getMinuteDifference(date2: Date, date1: Date) {
        var diff = (date2.getTime() - date1.getTime()) / 1000;
        diff /= 60;

        return Math.abs(Math.round(diff));
    }
}
