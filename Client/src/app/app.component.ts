import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OrdersPage } from '../pages/orders/orders.component';
import { ActiveOrdersPage } from '../pages/active-orders/active-orders.component';
import { CreateOrderPage } from '../pages/create-order/create-order.component';
import { MakeOrderItemPage } from '../pages/MakeOrderItem/MakeOrderItem';
import { MainPage } from '../pages/main/main.component';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) public nav: Nav;

    public rootPage: any = MainPage;
    public pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: MainPage },
            { title: 'Create Order', component: CreateOrderPage },
            { title: 'Active Orders', component: ActiveOrdersPage },
            { title: 'Orders History', component: OrdersPage },
            { title: 'Make Order Item', component: MakeOrderItemPage }
        ];
    }

    /**
     * @method
     * @description
     * Initializes the application.
     */
    public initializeApp(): void {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    /**
     * @method
     * @description
     * Opens the given page.
     */
    public openPage(page): void {
        this.nav.setRoot(page.component);
    }
}
