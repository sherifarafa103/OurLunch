import { Component } from '@angular/core';
import { Modal, ModalController, ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Observable } from 'rxjs/Rx';
import { Meal } from '../../../models/meal.model';
import { OrderItem } from '../../../models/orderItem.model';
import { Restaurant } from '../../../models/restaurant.model';
import { BaseService } from '../../../services/base.service';
import { MealService } from '../../../services/meal.service';
import { UserService } from '../../../services/user.service';
import { MealPopover } from '../meal-popover/meal-popover.component';

@Component({
    selector: 'item-popover',
    templateUrl: 'item-popover.component.html'
})
export class ItemPopover {
    public meals: Observable<Meal[]>;
    public restaurantId: number;
    public orderId: number;
    public mealId: number = null;
    public quantity: number = null;
    public notes: string = '';

    constructor(
        private _navParams: NavParams,
        private _viewController: ViewController,
        private _modalController: ModalController,
        private _baseService: BaseService,
        private _mealService: MealService,
        private _userService: UserService
    ) { }

    public ngOnInit(): void {
        this._initState();
    }

    public cancel(): void {
        this._viewController.dismiss();
    }

    public openMealPopover(event: MouseEvent): void {
        const modal: Modal = this._modalController.create(MealPopover);
        modal.present({ ev: event });

        modal.onDidDismiss(name => {
            if (name) {
                const meal: Meal = new Meal(0, this.restaurantId, name);

                this._mealService.add(meal)
                    .do(id => meal.id = id)
                    .do(id => this.mealId = id)
                    .subscribe();
            }
        })
    }

    public addItem(): void {
        this._validate();
        const newItem: OrderItem = new OrderItem(0, this.orderId, this._userService.currentUser.id, this.mealId, 0, +this.quantity, this.notes);

        this._viewController.dismiss(newItem);
    }

    private _validate(): boolean {
        if (!this.mealId) {
            this._baseService.showErrorToast('Please enter a meal');
            return false;
        }

        if (!this.quantity) {
            this._baseService.showErrorToast('Please enter a quantity');
            return false;
        }

        return true;
    }

    private _initState(): void {
        this.orderId = this._navParams.get('orderId');
        this.restaurantId = this._navParams.get('restaurantId');
        this.mealId = this._navParams.get('mealId');
        this.quantity = this._navParams.get('quantity');
        this.notes = this._navParams.get('notes');
        this.meals = this._mealService.get(this.restaurantId);
    }
}
