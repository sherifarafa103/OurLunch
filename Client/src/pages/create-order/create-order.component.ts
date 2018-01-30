import { Component } from '@angular/core';
import {
    LoadingController,
    NavController,
    ModalController,
    ViewController,
    Modal
} from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Order } from '../../models/order.model';
import { Restaurant } from '../../models/restaurant.model';
import { BaseService } from '../../services/base.service';
import { OrderService } from '../../services/order.service';
import { RestaurantService } from '../../services/restaurant.service';
import { UserService } from '../../services/user.service';
import { OrderPage } from '../order/order.component';
import { RestaurantPopover } from './restaurant-popover/restaurant-popover.component';

@Component({
    selector: 'create-order',
    templateUrl: 'create-order.component.html'
})
export class CreateOrderPage {
    public restaurants: Observable<Restaurant[]>;
    public restaurantId: number = null;
    public time: string = `${('0' + new Date().getHours()).slice(-2)}:${new Date().getMinutes()}`;

    constructor(
        private _navController: NavController,
        private _viewController: ViewController,
        private _loadingController: LoadingController,
        private _modalController: ModalController,
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
     * Opens the new restaurant pop over.
     *
     * @param {MouseEvent} event The mouse event.
     */
    public openPopover(event: MouseEvent): void {
        const modal: Modal = this._modalController.create(RestaurantPopover);
        modal.present({ ev: event });

        modal.onDidDismiss(name => {
            if (name) {
                const restaurant: Restaurant = new Restaurant(0, name);

                this._restaurantService.add(restaurant)
                    .do(id => restaurant.id = id)
                    .do(id => this.restaurantId = id)
                    .flatMap(() => this._restaurantService.get())
                    .subscribe();
            }
        })
    }

    /**
     * @method
     * @description
     * Creates a new order.
     */
    public createOrder(): void {
        if (!this._validateOrderForm()) {
            return;
        }

        const dateToSubmit: Date = this._getDateFromTimeString(this.time);
        const loader = this._loadingController.create({ content: "Creating order" });
        const order = new Order(0, this._userService.currentUser.id, this.restaurantId, dateToSubmit);

        loader.present();

        this._orderService.add(order)
            .finally(() => loader.dismiss())
            .do(id => order.id = id)
            .subscribe(
            () => this._navController.setRoot(OrderPage, { order: order }),
            () => this._baseService.showErrorToast('A server error occurred'));
    }

    /**
     * @private
     * @description
     * Validates the order form.
     */
    private _validateOrderForm(): boolean {
        if (this.restaurantId === null) {
            this._baseService.showErrorToast('Please pick or create a restaurant');
            return false;
        }

        if (this.time === null) {
            this._baseService.showErrorToast('Please specify a time for your order');
            return false;
        }

        const dateToSubmit: Date = this._getDateFromTimeString(this.time);

        if (dateToSubmit.getTime() < new Date().getTime()) {
            this._baseService.showErrorToast('Time must be in the future');
            return false;
        }

        return true;
    }

    /**
     * @private
     * @description
     * Converts the time string to date.
     *
     * @param {string} timeString The time strint to convert.
     */
    private _getDateFromTimeString(timeString: string): Date {
        const dateToSubmit: Date = new Date();
        const [hours, mins] = timeString.split(':');
        dateToSubmit.setHours(+hours, +mins);

        return dateToSubmit;
    }

    /**
     * @private
     * @description
     * Initialize the component.
     */
    private _initState(): void {
        this.restaurants = this._restaurantService.get()
            .map(restaurants => restaurants.sort((a, b) => a.name > b.name ? 1 : -1));
    }
}
