import { Component } from '@angular/core';
import { NavController, LoadingController, ViewController } from 'ionic-angular';
import { OrderService } from '../../services/order.service';
import { RestaurantService } from '../../services/restaurant.service';
import { UserService } from '../../services/user.service';
import { BaseService } from '../../services/base.service';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs/Rx';
import { Restaurant } from '../../models/restaurant.model';

@Component({
    selector: 'create-order',
    templateUrl: 'create-order.component.html'
})
export class CreateOrderPage {
    public restaurants: Observable<Restaurant[]>;
    public restaurantId: number = null;
    public time: string = `${('0' + new Date().getHours()).slice(-2)}:${new Date().getMinutes()}`;

    constructor(
        public navCtrl: NavController,
        private _viewController: ViewController,
        private _loadingController: LoadingController,
        private _orderService: OrderService,
        private _baseService: BaseService,
        private _restaurantService: RestaurantService,
        private _userService: UserService
    ) { }

    public ngOnInit(): void {
        this._initState();
    }

    /**
     * @method
     * @description
     * Closes the modal.
     */
    public dismiss(): void {
        this._viewController.dismiss();
    }

    /**
     * @method
     * @description
     * Creates a new order.
     */
    public createOrder(): void {
        console.log(this.time);
        if (this.restaurantId !== null && this.time !== null) {
            const dateToSubmit: Date = new Date();
            const [hours, mins] = this.time.split(':');
            dateToSubmit.setHours(+hours, +mins);

            if (dateToSubmit.getTime() < new Date().getTime()) {
                this._baseService.showErrorToast('Time must be in the future');
            }
            else {
                let loader = this._loadingController.create({ content: "Creating order" });
                let order = new Order(this._userService.currentUser.id, this.restaurantId, dateToSubmit);
                this._orderService.add(order)
                    .finally(() => loader.dismiss())
                    .subscribe(() => { alert("SUCCEEDED"); }, () => this._baseService.showErrorToast('A server error occurred'));
            }
        }
    }

    private _initState(): void {
        this.restaurants = this._restaurantService.get()
            .map(restaurants => restaurants.sort((a, b) => a.name > b.name ? 1 : -1));
    }

}
