import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'signUp.html'
})
export class SignUpPage {
  public alias: string;
  public firstName: string;
  public lastName: string;

  constructor(public navCtrl: NavController, private _userService: UserService) {
  }

  onKeyPress(event): void {
    console.log(event);
  }

  addUser() {
    var u = new User(this.alias, this.firstName, this.lastName);
    this._userService.addUser(u).subscribe(() => { alert("SUCCEEDED"); }, () => { alert("FAILED"); });
  }

}
