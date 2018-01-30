import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MainPage } from '../main/main.component';
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
        private _navController: NavController,
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
        if (this.alias.trim() !== '' && this.firstName.trim() !== '' && this.lastName.trim() !== '') {
            let loader = this._loadingController.create({ content: "Signing in" });
            loader.present();

            let user = new User(this.alias, this.firstName, this.lastName);


            this._userService.add(user)
                .subscribe(() => this._navController.push(MainPage), () => this._baseService.showErrorToast('A server error occurred!'));
        }
    }
}
