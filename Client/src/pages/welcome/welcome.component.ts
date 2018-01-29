import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in.component';
import { SignUpPage } from '../sign-up/sign-up.component';

@Component({
    selector: 'welcome-page',
    templateUrl: 'welcome.component.html'
})
export class WelcomePage {
    constructor(public _modalService: ModalController) { }

    public signUp(): void {
        let modal = this._modalService.create(SignUpPage);
        modal.present();
    }

    public signIn(): void {
        let modal = this._modalService.create(SignInPage);
        modal.present();
    }
}
