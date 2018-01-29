import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome.component';
import { SignUpPage } from '../pages/sign-up/sign-up.component';
import { SignInPage } from '../pages/sign-in/sign-in.component';
import { OrdersHistoryPage } from '../pages/orders/orders.component';
import { CreateOrderPage } from '../pages/CreateOrder/CreateOrder';
import { MakeOrderItemPage } from '../pages/MakeOrderItem/MakeOrderItem';
import { MainPage } from '../pages/main/main.component';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = WelcomePage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: MainPage },
            { title: 'Create Order', component: CreateOrderPage },
            { title: 'Active Orders', component: OrdersHistoryPage },
            { title: 'Orders History', component: OrdersHistoryPage },
            { title: 'Make Order Item', component: MakeOrderItemPage }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}
