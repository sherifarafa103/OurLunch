import { Inject, Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IResource, IResourceApiParser } from '../../interfaces/IResource';
import { ResourceCache } from '../../models/utils/resource-cache.model';
import { HttpService } from './http.service';

/**
 * @class
 * @description
 * Represents a concrete implementation for the data service interface. This implementation
 * is meant for production usage.
 */
@Injectable()
export class CacheService {
    private _cacheMap: Map<string, ResourceCache>;

    constructor(
        private _httpService: HttpService
    ) {
        this._cacheMap = new Map<string, ResourceCache>();
    }

    public get(path: string, parser: IResourceApiParser, requestOptions: RequestOptions): Observable<IResource[]> {
        let cache: ResourceCache;
        cache = this._getCache(path);

        this._httpService.get(path, requestOptions)
            .map(response => (<any[]>response).map(datum => parser(datum)))
            .subscribe(data => cache.set(data));

        return cache.getItems();
    }

    public post(path: string, data: IResource, requestOptions: RequestOptions): Observable<number> {
        const cache: ResourceCache = this._getCache(path);

        return this._httpService.post(path, data.exportToApi(), requestOptions)
            .do(id => data.id = id)
            .do(() => cache.add(data))
            .map(() => data.id);
    }

    public put(path: string, data: IResource, requestOptions: RequestOptions): Observable<void> {
        const cache: ResourceCache = this._getCache(path);

        return this._httpService.put(`${path}/${data.id}`, data.exportToApi(), requestOptions)
            .map(response => cache.update(data));
    }

    public delete(path: string, id: number, requestOptions: RequestOptions): Observable<void> {
        const cache: ResourceCache = this._getCache(path);

        return this._httpService.delete(`${path}/${id}`, requestOptions)
            .map($ => cache.delete(id));
    }

    private _getCache(path: string): ResourceCache {
        if (!this._cacheMap.has(path)) {
            this._cacheMap.set(path, new ResourceCache());
        }

        return this._cacheMap.get(path);
    }

    private checkForCache(path: string): boolean {
        return this._cacheMap.has(path);
    }
}
