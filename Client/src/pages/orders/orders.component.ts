import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'orders-page',
    templateUrl: 'orders.component.html'
})
export class OrdersPage {
    public startFilter: Date;
    public endFilter: Date;

    constructor(public navCtrl: NavController) { }
}
