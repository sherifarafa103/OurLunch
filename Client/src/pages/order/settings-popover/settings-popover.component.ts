import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Order } from '../../../models/order.model';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
    selector: 'settings-popover',
    templateUrl: 'settings-popover.component.html'
})
export class SettingsPopover {
    public order: Order;

    constructor(
        private _viewController: ViewController,
        private _navParams: NavParams
    ) { }

    public ngOnInit(): void {
        this._initState();
    }

    public cancel(): void {
        this._viewController.dismiss();
    }

    public save(): void {
        this._viewController.dismiss(this.order);
    }

    private _initState(): void {
        this.order = this._navParams.get('order');
    }
}
