import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Components
import { WelcomePage } from '../pages/welcome/welcome.component';
import { SignUpPage } from '../pages/sign-up/sign-up.component';
import { SignInPage } from '../pages/sign-in/sign-in.component';
import { MyApp } from './app.component';
import { OrdersHistoryPage } from '../pages/orders/orders.component';
import { CreateOrderPage } from '../pages/CreateOrder/CreateOrder';
import { MakeOrderItemPage } from '../pages/MakeOrderItem/MakeOrderItem';
import { MainPage } from '../pages/main/main.component';

// Services
import { HttpModule } from '@angular/http';
import { BaseService } from '../services/base.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { OrderItemService } from '../services/orderItem.service';

// Ionic components
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
        MyApp,
        SignUpPage,
        OrdersHistoryPage,
        SignInPage,
        CreateOrderPage,
        MakeOrderItemPage,
        WelcomePage,
        MainPage
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
        OrdersHistoryPage,
        SignInPage,
        CreateOrderPage,
        MakeOrderItemPage,
        WelcomePage,
        MainPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        BaseService,
        UserService,
        OrderService,
        OrderItemService
    ]
})
export class AppModule { }
