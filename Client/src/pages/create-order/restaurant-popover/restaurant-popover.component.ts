import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { BaseService } from '../../../services/base.service';

@Component({
    selector: 'restaurant-popover',
    templateUrl: 'restaurant-popover.component.html'
})
export class RestaurantPopover {
    public name: string = "";

    constructor(
        private _viewController: ViewController,
        private _baseService: BaseService
    ) { }

    public cancel(): void {
        this._viewController.dismiss();
    }

    public save(): void {
        if (this.name.trim() === "") {
            this._baseService.showErrorToast('Please enter a name');
            return;
        }

        this._viewController.dismiss(this.name);
    }
}
