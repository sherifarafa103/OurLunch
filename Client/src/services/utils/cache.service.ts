import { Injectable } from '@angular/core';
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

    public get(path: string, parser: IResourceApiParser, refresh: boolean = false): Observable<IResource[]> {
        let cache: ResourceCache;

        if (!this._checkForCache(path) || refresh) {
            cache = this._getCache(path);
            cache.reset();

            this._httpService.get(path)
                .map(response => (<any[]>response).map(datum => parser(datum)))
                .subscribe(data => cache.set(data));
        }
        else {
            cache = this._getCache(path);
        }

        return cache.getItems();
    }

    public post(path: string, data: IResource, local: boolean = false): Observable<number> {
        if (local && !this._checkForCache(path)) {
            return;
        }

        const cache: ResourceCache = this._getCache(path);

        if (local) {
            cache.add(data);

            return Observable.of(data.id);
        }
        else {
            return this._httpService.post(path, data.exportToApi())
                .do(id => data.id = id)
                .do(() => cache.add(data))
                .map(() => data.id);
        }

    }

    public put(path: string, data: IResource, local: boolean = false): Observable<void> {
        const cache: ResourceCache = this._getCache(path);

        if (local) {
            return Observable.of(cache.update(data));
        }

        return this._httpService.put(`${path}/${data.id}`, data.exportToApi())
            .map(response => cache.update(data));
    }

    public delete(path: string, id: number, local: boolean = false): Observable<void> {
        const cache: ResourceCache = this._getCache(path);

        if (local) {
            return Observable.of(cache.delete(id));
        }

        return this._httpService.delete(`${path}/${id}`)
            .map($ => cache.delete(id));
    }

    private _getCache(path: string): ResourceCache {
        if (!this._cacheMap.has(path)) {
            this._cacheMap.set(path, new ResourceCache());
        }

        return this._cacheMap.get(path);
    }

    private _checkForCache(path: string): boolean {
        return this._cacheMap.has(path);
    }
}
