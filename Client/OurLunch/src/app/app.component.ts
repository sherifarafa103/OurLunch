import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SignUpPage } from '../pages/SignUp/signUp';
import { OrdersHistoryPage } from '../pages/OrdersHistory/OrdersHistory';
//import { OrdersHistoryPage } from '../pages/OrdersHistory/OrdersHistory';
import { SignInPage } from '../pages/Sign-In/SignIn';
import { CreateOrderPage } from '../pages/CreateOrder/CreateOrder';
import { MakeOrderItemPage } from '../pages/MakeOrderItem/MakeOrderItem';
import { WelcomePage } from '../pages/Welcome/Welcome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignUpPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'SignUp!', component: SignUpPage },
      { title: 'Orders History', component: OrdersHistoryPage },
      //{ title: 'Order History', component: OrderHistoryPage },
      { title: 'Sign In', component: SignInPage },
      { title: 'Create Order', component: CreateOrderPage },
      { title: 'Make Order Item', component: MakeOrderItemPage },
      { title: 'Welcome', component: WelcomePage },
      //{ title: 'Orders History', component: OrdersHistoryPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
