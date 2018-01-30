import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../models/user.model';
import { BaseService } from '../services/base.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs';

@Injectable()
export class UserService {
    public currentUser: User = null;

    constructor(
        private _baseService: BaseService,
        private _httpService: Http
    ) { }

    public get(id?: number): Observable<User[]> {
        return this._httpService.get(`${this._baseService.baseUrl}/users/${id}`)
            .map(r => r.json());
    }

    public signIn(alias: string): Observable<User> {
        return this._httpService.get(`${this._baseService.baseUrl}/users/alias/${alias}`)
            .map(r => r.json())
            .do(user => this.currentUser = user);
    }

    public add(user: User): Observable<number> {
        return this._httpService.post(`${this._baseService.baseUrl}/users`, user)
            .map(r => r.json())
            .do(id => user.userId = id)
            .do(() => this.currentUser = user);
    }
}
