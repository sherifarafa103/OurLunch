import { Component } from '@angular/core';
import {
    AlertController,
    Modal,
    ModalController,
    ViewController
} from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Observable } from 'rxjs/Rx';
import { Meal } from '../../../models/meal.model';
import { OrderItem } from '../../../models/orderItem.model';
import { Restaurant } from '../../../models/restaurant.model';
import { BaseService } from '../../../services/base.service';
import { MealService } from '../../../services/meal.service';
import { UserService } from '../../../services/user.service';
import { MealPopover } from '../meal-popover/meal-popover.component';
import { User } from '../../../models/user.model';

@Component({
    selector: 'item-popover',
    templateUrl: 'item-popover.component.html'
})
export class ItemPopover {
    public itemId: number = 0;
    public restaurantId: number;
    public orderId: number;
    public notes: string = '';
    public quantity: number = null;
    public price: number = null;
    public mealId: number = null;
    public userId: number = null;

    public isEdit: boolean;
    public meals: Observable<Meal[]>;
    public currentUser: User;

    constructor(
        private _navParams: NavParams,
        private _viewController: ViewController,
        private _modalController: ModalController,
        private _alertController: AlertController,
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

    public deleteItem(): void {
        let confirm = this._alertController.create({
            title: 'Delete item?',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                { text: 'No' },
                { text: 'Yes', handler: () => { this._viewController.dismiss({ delete: true }); } }
            ]
        });

        confirm.present();
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
        const newItem: OrderItem = new OrderItem(this.itemId, this.orderId, this._userService.currentUser.id, this.mealId, this.price, +this.quantity, this.notes);

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
        this.isEdit = this._navParams.get('isEdit');
        this.itemId = this._navParams.get('id');
        this.orderId = this._navParams.get('orderId');
        this.userId = this._navParams.get('userId');
        this.restaurantId = this._navParams.get('restaurantId');
        this.mealId = this._navParams.get('mealId');
        this.quantity = this._navParams.get('quantity');
        this.price = this._navParams.get('price');
        this.notes = this._navParams.get('notes');
        this.meals = this._mealService.get(this.restaurantId);
        this.currentUser = this._userService.currentUser;
    }
}
