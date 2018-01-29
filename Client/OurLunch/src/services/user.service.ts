import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx'
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(private _httpService: Http) { }

  signIn(alias: string) {
    return this._httpService.get(`http://localhost:55013/api/users/alias/${alias}`).map(r => r.json());
  }

  addUser(user: User) {
    return this._httpService.post('http://localhost:55013/api/users', user);
  }

}
