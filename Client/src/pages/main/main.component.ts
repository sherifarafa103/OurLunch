import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in.component';
import { SignUpPage } from '../sign-up/sign-up.component';

@Component({
    selector: 'main-page',
    templateUrl: 'main.component.html'
})
export class MainPage {
    constructor(public _modalService: ModalController) { }

    public viewActiveOrders(): void {

    }

    public createOrder(): void {

    }
}
