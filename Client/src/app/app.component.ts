import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome.component';
import { SignUpPage } from '../pages/sign-up/sign-up.component';
import { SignInPage } from '../pages/sign-In/sign-in.component';
import { OrdersHistoryPage } from '../pages/OrdersHistory/OrdersHistory';
import { CreateOrderPage } from '../pages/CreateOrder/CreateOrder';
import { MakeOrderItemPage } from '../pages/MakeOrderItem/MakeOrderItem';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = SignUpPage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Welcome', component: WelcomePage },
            { title: 'SignUp!', component: SignUpPage },
            { title: 'Sign In', component: SignInPage },
            { title: 'Orders History', component: OrdersHistoryPage },
            { title: 'Create Order', component: CreateOrderPage },
            { title: 'Make Order Item', component: MakeOrderItemPage },
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
