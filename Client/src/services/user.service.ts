import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BaseService } from '../services/base.service';
import { HttpService } from '../services/utils/http.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
    public currentUser: User = null;

    constructor(
        private _baseService: BaseService,
        private _httpService: HttpService,
    ) { }

    public get(): Observable<User[]> {
        return <Observable<User[]>>this._httpService.get(`${this._baseService.baseUrl}/users`, null)
            .map(data => data.map(d => User.importFromApi(d)));
    }

    public signIn(alias: string): Observable<User> {
        return this._httpService.get(`${this._baseService.baseUrl}/users/alias/${alias}`, null)
            .map(data => User.importFromApi(data))
            .do(user => this.currentUser = user);
    }

    public add(user: User): Observable<number> {
        return this._httpService.post(`${this._baseService.baseUrl}/users`, user, null)
            .do(id => user.id = id)
            .do(() => this.currentUser = user);
    }
}
