import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'sign-in',
    templateUrl: 'sign-in.component.html'
})
export class SignInPage {
    public alias: string = "";

    constructor(public navCtrl: NavController, private _userService: UserService) {

    }

    signIn() {
        if (this.alias.trim() !== "") {
            this._userService.signIn(this.alias).subscribe((user) => {

            }, (error) => alert("Error"));
        }
    }

}
