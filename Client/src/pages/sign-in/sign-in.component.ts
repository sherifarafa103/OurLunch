import { Component } from '@angular/core';
import { ViewController, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { BaseService } from '../../services/base.service';
import { MainPage } from '../main/main.component';

@Component({
    selector: 'sign-in',
    templateUrl: 'sign-in.component.html'
})
export class SignInPage {
    public alias: string = "";

    constructor(
        private _viewController: ViewController,
        private _baseService: BaseService,
        private _loadingController: LoadingController,
        private _userService: UserService
    ) { }

    /**
     * @method
     * @description
     * Closes the sign in form.
     */
    public dismiss(): void {
        this._viewController.dismiss();
    }

    /**
     * @method
     * @description
     * Signs the user in to the system.
     */
    public signIn(): void {
        if (this.alias.trim() === '') {
            this._baseService.showErrorToast('Alias is required');
            return;
        }

        let loader = this._loadingController.create({ content: "Signing in" });
        loader.present();

        this._userService.signIn(this.alias)
            .finally(() => loader.dismiss())
            .subscribe(() => this.dismiss(), () => this._baseService.showErrorToast(
                "User does not exist or a server error occurred.")
            );
    }
}
