/**
 * @class
 * @description
 * Represents a cacheable item. Contains a generic item and the timestamp of
 * its addition in the cache. The timestamp is useful for operations like sorting
 * when order of cache placement is important.
 *
 * @param {T} item Generic item data.
 * @param {number} timestamp The timestamp of the addition of the item to the cache.
 */
export class Cacheable<T> {
    public item: T;
    public timestamp: number;

    constructor(item: T, timestamp: number) {
        this.item = item;
        this.timestamp = timestamp;
    }
}
