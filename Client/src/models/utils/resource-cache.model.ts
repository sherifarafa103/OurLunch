import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { IResource } from '../../interfaces/IResource';
import { Cacheable } from './cacheable.model';

const CACHE_SENTINEL: { sentinel: boolean } = { sentinel: true };

/**
 * @class
 * @description
 * Represents a reactive cache. Implements basic caching functions. Notifies subscribers
 * when changes in the cache occur. Returns items in descending order of their timestamp of addition.
 */
export class ResourceCache {
    private _items: Cacheable<IResource>[];
    private _subject: BehaviorSubject<IResource[]>;
    private _nonceIterator: number = 0;

    constructor() {
        this._subject = new BehaviorSubject([<any>CACHE_SENTINEL]);
    }

    /**
     * @method
     * @description
     * Gets the items in the cache as an observable of the underlying stream.
     * This observable is infinite till the lifetime of the cache.
     *
     * @returns {Observable<IResource[]>} An observable of the stream of items in this cache.
     */
    public getItems(): Observable<IResource[]> {
        return this._subject.asObservable()
            .filter(data => !data.length || data.length > 0 && (<any>data[0]).sentinel === undefined);
    }

    /**
     * @method
     * @description
     * Sets the items in the cache with the data given. Overwrites any
     * existing data. Notifies subscribers with update.
     *
     * @param {IResource[]} data The data to set.
     */
    public set(data: IResource[]): void {
        this._items = data.map(d => new Cacheable(d, this._nonceIterator++));
        this._notify();
    }

    /**
     * @method
     * @description
     * Adds an item to the cache. Notifies subscribers with update.
     *
     * @param {IResource} item The item to add.
     */
    public add(item: IResource): void {
        this._items.push(new Cacheable(item, this._nonceIterator++));
        this._notify();
    }

    /**
     * @method
     * @description
     * Adds an array of items to the cache. Notifies subscribers with update.
     *
     * @param {IResource[]} items The data to add.
     */
    public batchAdd(items: IResource[]): void {
        items.map(item => this._items.push(new Cacheable(item, this._nonceIterator++)));
        this._notify();
    }

    /**
     * @method
     * @description
     * Updates the given item in the cache if exists. Notifies subscribers with update.
     *
     * @param {IResource} item The item to update if existed.
     */
    public update(item: IResource): void {
        const cacheableToUpdate: Cacheable<IResource> = this._items.find(i => i.item.id === item.id);

        if (cacheableToUpdate) {
            cacheableToUpdate.item = item;
            this._notify();
        }
    }

    /**
     * @method
     * @description
     * Deletes the item with the given id. Notifies subscribers with update.
     *
     * @param {string|number} itemId The id of the item to delete.
     */
    public delete(itemId: string | number): void {
        const indexToDelete: number = this._items.findIndex(i => i.item.id === itemId);

        if (indexToDelete >= 0) {
            this._items.splice(indexToDelete, 1);
            this._notify();
        }
    }

    /**
     * @method
     * @description
     * Resets the cache by emptying the items and optionally placing
     * the sentinal on the stream.
     *
     * @param {boolean} withSentinal Adds sentinal on the stream if true
     * and notifies subscribers with empty array if false.
     */
    public reset(withSentinal: boolean = true): void {
        this._items = [];

        if (withSentinal) {
            this._subject.next([<any>CACHE_SENTINEL]);
        }
        else {
            this._notify();
        }
    }

    /**
     * @private
     * @description
     * Notifies the subscribers with the new stream value.
     */
    private _notify(): void {
        this._subject.next(
            this._items
                .sort((l, r) => l.timestamp < r.timestamp ? 1 : -1)
                .map(i => i.item)
        );
    }
}
