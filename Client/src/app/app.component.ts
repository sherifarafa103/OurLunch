import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { ActiveOrdersPage } from '../pages/active-orders/active-orders.component';
import { CreateOrderPage } from '../pages/create-order/create-order.component';
import { MainPage } from '../pages/main/main.component';
import { OrdersPage } from '../pages/orders/orders.component';
import { RealTimeUpdaterService } from '../services/utils/real-time-updater.service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) public nav: Nav;

    public rootPage: any = MainPage;
    public pages: Array<{ title: string, component: any }>;

    constructor(
        private _updaterService: RealTimeUpdaterService,
        private _platform: Platform,
        private _statusBar: StatusBar,
        private _splashScreen: SplashScreen
    ) {
        this.initializeApp();

        // Used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: MainPage },
            { title: 'Create Order', component: CreateOrderPage },
            { title: 'Active Orders', component: ActiveOrdersPage },
            { title: 'Orders History', component: OrdersPage },
        ];
    }

    /**
     * @method
     * @description
     * Initializes the application.
     */
    public initializeApp(): void {
        this._updaterService.initService();

        this._platform.ready().then(() => {
            this._statusBar.styleDefault();
            this._splashScreen.hide();
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
