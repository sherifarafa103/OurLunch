import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome.component';
import { ActiveOrdersPage } from '../active-orders/active-orders.component';
import { CreateOrderPage } from '../create-order/create-order.component';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'main-page',
    templateUrl: 'main.component.html'
})
export class MainPage {
    constructor(
        public _navController: NavController,
        public _userService: UserService
    ) { }

    public ngOnInit(): void {
        this._checkSignInState();
    }

    /**
     * @method
     * @description
     * Navigate to active orders.
     */
    public viewActiveOrders(): void {
        this._navController.push(ActiveOrdersPage, null, { animate: true });
    }

    /**
     * @method
     * @description
     * Navigate to create order page.
     */
    public createOrder(): void {
        this._navController.setRoot(CreateOrderPage, null, { animate: true });
    }

    /**
     * @private
     * @description
     * Checks if the user has successfully signed in. If yes
     * then navigate back to the main page.
     */
    private _checkSignInState(): void {
        if (this._userService.currentUser === null) {
            this._navController.push(WelcomePage);
        }
    }
}
