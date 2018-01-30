import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Components
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome.component';
import { SignUpPage } from '../pages/sign-up/sign-up.component';
import { SignInPage } from '../pages/sign-in/sign-in.component';
import { ActiveOrdersPage } from '../pages/active-orders/active-orders.component';
import { CreateOrderPage } from '../pages/create-order/create-order.component';
import { RestaurantPopover } from '../pages/create-order/restaurant-popover/restaurant-popover.component';
import { OrdersPage } from '../pages/orders/orders.component';
import { OrderPage } from '../pages/order/order.component';
import { MakeOrderItemPage } from '../pages/MakeOrderItem/MakeOrderItem';
import { MainPage } from '../pages/main/main.component';

// Services
import { HttpModule } from '@angular/http';
import { BaseService } from '../services/base.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { RestaurantService } from '../services/restaurant.service';
import { OrderItemService } from '../services/orderItem.service';

// Ionic components
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        SignUpPage,
        OrdersPage,
        SignInPage,
        CreateOrderPage,
        MakeOrderItemPage,
        WelcomePage,
        MainPage,
        ActiveOrdersPage,
        OrderPage,
        RestaurantPopover
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        SignUpPage,
        OrdersPage,
        SignInPage,
        CreateOrderPage,
        MakeOrderItemPage,
        WelcomePage,
        MainPage,
        ActiveOrdersPage,
        OrderPage,
        RestaurantPopover
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        BaseService,
        UserService,
        OrderService,
        OrderItemService,
        RestaurantService
    ]
})
export class AppModule { }
