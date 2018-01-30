import { IResource } from "../interfaces/IResource";

export class Order implements IResource {
    id: number;
    userId: number;
    restaurantId: number;
    time: Date;

    constructor(id: number, userId: number, restaurantId: number, time: Date) {
        this.id = id;
        this.userId = userId;
        this.restaurantId = restaurantId;
        this.time = time;
    }

    static importFromApi(apiObject): Order {
        return new Order(apiObject.orderId, apiObject.userId, apiObject.restaurantId, apiObject.time);
    }

    public exportToApi(): Object {
        return {
            orderId: this.id,
            userId: this.userId,
            restaurantId: this.restaurantId,
            time: this.time
        };
    }
}
