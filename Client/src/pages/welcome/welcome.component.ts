import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Component({
    selector: 'welcome-page',
    templateUrl: 'welcome.component.html'
})
export class WelcomePage {
    constructor(public _modalService: ModalController) { }

    public signUp(): void {

    }

    public login(): void {

    }
}
