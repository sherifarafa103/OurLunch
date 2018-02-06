import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpService {
    constructor(
        private _http: Http
    ) { }

    public get(path: string): Observable<any> {
        return this._http.get(path)
            .map(response => response.json());
    }

    public post(path: string, data: Object): Observable<any> {
        return this._http.post(path, data)
            .map(response => response.arrayBuffer().byteLength > 0 ? response.json() : {})
    }

    public put(path: string, data: Object): Observable<any> {
        return this._http.put(path, data);
    }

    public delete(path: string): Observable<any> {
        return this._http.delete(path);
    }
}
