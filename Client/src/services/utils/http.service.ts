import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../base.service';

/**
 * @class
 * @description
 * Represents a concrete implementation for the generic html service interface. This implementation
 * is meant for production usage.
 */
@Injectable()
export class HttpService {
    constructor(
        private _http: Http,
        private _baseService: BaseService
    ) { }

    /**
     * @method
     * @description
     * Gets the resource with the given path.
     *
     * @param {string} path The path to call.
     * @returns {Observable<Object>} An observable of the resulting object.
     */
    public get(path: string, requestOptions: RequestOptions): Observable<any> {
        return this._http.get(path, requestOptions)
            .map(response => response.json());
    }

    /**
     * @method
     * @description
     * Posts a new object to the given path.
     *
     * @param {string} path The path to call.
     * @param {Object} data The data to add.
     * @returns {Observable<any>} An observable to indicate completion.
     */
    public post(path: string, data: Object, requestOptions: RequestOptions): Observable<any> {
        return this._http.post(path, data, requestOptions)
            .map(response => response.arrayBuffer().byteLength > 0 ? response.json() : {})
    }

    /**
     * @method
     * @description
     * Updates an existing object to the given path.
     *
     * @param {string} path The path to call.
     * @param {Object} data The data to add. Must implement IApiExportable interface.
     * @returns {Observable<any>} An observable indicating completion.
     */
    public put(path: string, data: Object, requestOptions: RequestOptions): Observable<any> {
        return this._http.put(path, data, requestOptions);
    }

    /**
     * @method
     * @description
     * Deletes an existing object from the given path.
     *
     * @param {string} path The path to call.
     * @returns {Observable<any>} An observable indicating completion.
     */
    public delete(path: string, requestOptions: RequestOptions): Observable<any> {
        return this._http.delete(path, requestOptions);
    }
}
