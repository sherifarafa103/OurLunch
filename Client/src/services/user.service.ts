import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BaseService } from '../services/base.service';
import { HttpService } from '../services/utils/http.service';
import { CacheService } from '../services/utils/cache.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
    public currentUser: User = null;

    constructor(
        private _baseService: BaseService,
        private _httpService: HttpService,
        private _cacheService: CacheService
    ) { }

    public get(refresh: boolean = false): Observable<User[]> {
        return <Observable<User[]>>this._cacheService.get(`${this._baseService.baseUrl}/users`, User.importFromApi, refresh);
    }

    public signIn(alias: string): Observable<User> {
        return this._httpService.get(`${this._baseService.baseUrl}/users/alias/${alias}`)
            .map(data => User.importFromApi(data))
            .do(user => this.currentUser = user)
            .do(user => this._cacheService.post(`${this._baseService.baseUrl}/users`, user, true));
    }

    public add(user: User, local: boolean = false): Observable<number> {
        if (local) {
            return this._cacheService.post(`${this._baseService.baseUrl}/users`, user, local);
        }

        return this._httpService.post(`${this._baseService.baseUrl}/users`, user)
            .do(id => user.id = id)
            .do(() => this.currentUser = user)
            .do(() => this._cacheService.post(`${this._baseService.baseUrl}/users`, user, local));
    }
}
