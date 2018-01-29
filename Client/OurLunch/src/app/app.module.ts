import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { SignUpPage } from '../pages/SignUp/signUp';
import { OrdersHistoryPage } from '../pages/OrdersHistory/OrdersHistory';
import { SignInPage } from '../pages/Sign-In/SignIn';
import { CreateOrderPage } from '../pages/CreateOrder/CreateOrder';
import { MakeOrderItemPage } from '../pages/MakeOrderItem/MakeOrderItem';
import { WelcomePage } from '../pages/Welcome/Welcome';
//import { OrdersHistoryPage } from '../pages/OrdersHistory/OrdersHistory';

import { HttpModule } from '@angular/http';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { OrderItemService } from '../services/orderItem.service';

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
   //OrdersHistoryPage,
    SignInPage,
    CreateOrderPage,
    MakeOrderItemPage,
    WelcomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    OrderService,
    OrderItemService
  ]
})
export class AppModule { }
