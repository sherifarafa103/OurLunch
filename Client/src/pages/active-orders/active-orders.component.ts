import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'active-orders-page',
    templateUrl: 'active-orders.component.html'
})
export class ActiveOrdersPage {

    constructor(public navCtrl: NavController) { }
}
