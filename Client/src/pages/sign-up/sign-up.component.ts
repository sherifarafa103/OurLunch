import { Component } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BaseService } from '../../services/base.service';

@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html'
})
export class SignUpPage {
    public alias: string;
    public firstName: string;
    public lastName: string;

    constructor(
        private _viewController: ViewController,
        private _loadingController: LoadingController,
        private _baseService: BaseService,
        private _userService: UserService
    ) { }

    /**
     * @method
     * @description
     * Closes the sign up form.
     */
    public dismiss(): void {
        this._viewController.dismiss();
    }

    /**
     * @method
     * @description
     * Signs the user up.
     */
    public signUp(): void {
        if (!this._validateForm()) {
            return;
        }

        let loader = this._loadingController.create({ content: "Signing in" });
        let user = new User(0, this.alias, this.firstName, this.lastName);

        loader.present();

        this._userService.add(user)
            .finally(() => loader.dismiss())
            .subscribe(() => this.dismiss(), () => this._baseService.showErrorToast('A server error occurred!'));
    }

    /**
     * @private
     * @description
     * Validates the user form.
     */
    private _validateForm(): boolean {
        if (this.alias.trim() === '') {
            this._baseService.showErrorToast('Alias is required');
            return false;
        }

        if (this.firstName.trim() === '') {
            this._baseService.showErrorToast('First name is required');
            return false;
        }

        if (this.lastName.trim() === '') {
            this._baseService.showErrorToast('Last name is required');
            return false;
        }

        return true;
    }
}
