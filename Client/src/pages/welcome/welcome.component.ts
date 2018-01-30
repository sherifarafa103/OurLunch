import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in.component';
import { SignUpPage } from '../sign-up/sign-up.component';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'welcome-page',
    templateUrl: 'welcome.component.html'
})
export class WelcomePage {
    constructor(
        public _modalService: ModalController,
        public _navController: NavController,
        public _userService: UserService
    ) { }

    /**
     * @method
     * @description
     * Signs the user up through the modal. Checks sign
     * in state on close
     */
    public signUp(): void {
        let modal = this._modalService.create(SignUpPage);
        modal.present();
        modal.onDidDismiss(this._checkSignInState.bind(this));
    }

    /**
     * @method
     * @description
     * Signs the user in through the modal. Checks sign
     * in state on close
     */
    public signIn(): void {
        let modal = this._modalService.create(SignInPage);
        modal.present();
        modal.onDidDismiss(this._checkSignInState.bind(this));
    }

    /**
     * @private
     * @description
     * Checks if the user has successfully signed in. If yes
     * then navigate back to the main page.
     */
    private _checkSignInState(): void {
        if (this._userService.currentUser !== null) {
            this._navController.pop();
        }
    }
}
