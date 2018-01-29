import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'Welcome',
  templateUrl: 'Welcome.html'
})
export class WelcomePage {
  public p: string;

  constructor(public navCtrl: NavController) {
  }

  onKeyPress(event): void {
    console.log(event);
  }

}
