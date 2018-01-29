import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
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
        private _navController: NavController,
        private _baseService: BaseService,
        private _loadingController: LoadingController,
        private _userService: UserService
    ) { }

    public dismiss(): void {
        this._viewController.dismiss();
    }

    public signIn(): void {
        if (this.alias.trim() !== "") {
            let loader = this._loadingController.create({ content: "Signing in" });
            loader.present();

            this._userService.signIn(this.alias)
                .finally(() => loader.dismiss())
                .subscribe(() => this._navController.push(MainPage), () => this._baseService.showErrorToast(
                    "User does not exist or a server error occurred.")
                );
        }
    }
}
