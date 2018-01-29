import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'sign-up',
    templateUrl: 'sign-up.component.html'
})
export class SignUpPage {
    public alias: string;
    public firstName: string;
    public lastName: string;

    constructor(
        public navCtrl: NavController,
        private _userService: UserService) { }

    public addUser(): void {
        let user = new User(this.alias, this.firstName, this.lastName);
        this._userService.add(user)
            .subscribe();
    }

}
