import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NgxPaginationModule } from 'ngx-pagination';

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
import { MainPage } from '../pages/main/main.component';
import { MealPopover } from '../pages/order/meal-popover/meal-popover.component';
import { ItemPopover } from '../pages/order/item-popover/item-popover.component';
import { SettingsPopover } from '../pages/order/settings-popover/settings-popover.component';

// Pipes
import { UserNameAsyncPipe } from '../pipes/user-name-async.pipe';
import { RestaurantNameAsyncPipe } from '../pipes/restaurant-name-async.pipe';
import { MealNameAsyncPipe } from '../pipes/meal-name-async.pipe';
import { ActiveDatePipe } from '../pipes/active-date.pipe';

// Services
import { HttpModule } from '@angular/http';
import { BaseService } from '../services/base.service';
import { CacheService } from '../services/utils/cache.service';
import { HttpService } from '../services/utils/http.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { RestaurantService } from '../services/restaurant.service';
import { OrderItemService } from '../services/orderItem.service';
import { MealService } from '../services/meal.service';
import { WebsocketService } from '../services/utils/websocket.service';
import { RealTimeUpdaterService } from '../services/utils/real-time-updater.service';

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
        WelcomePage,
        MainPage,
        ActiveOrdersPage,
        OrderPage,
        RestaurantPopover,
        UserNameAsyncPipe,
        RestaurantNameAsyncPipe,
        ActiveDatePipe,
        MealPopover,
        ItemPopover,
        MealNameAsyncPipe,
        SettingsPopover
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        NgxPaginationModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        SignUpPage,
        OrdersPage,
        SignInPage,
        CreateOrderPage,
        WelcomePage,
        MainPage,
        ActiveOrdersPage,
        OrderPage,
        RestaurantPopover,
        MealPopover,
        ItemPopover,
        SettingsPopover
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CacheService,
        HttpService,
        BaseService,
        UserService,
        OrderService,
        OrderItemService,
        RestaurantService,
        MealService,
        WebsocketService,
        RealTimeUpdaterService
    ]
})
export class AppModule { }
