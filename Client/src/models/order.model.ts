import { IResource } from "../interfaces/IResource";

export class Order implements IResource {
    id: number;
    userId: number;
    restaurantId: number;
    time: Date;
    tax: number;
    delivery: number;

    constructor(id: number, userId: number, restaurantId: number, time: Date, tax: number = 0, delivery: number = 0) {
        this.id = id;
        this.userId = userId;
        this.restaurantId = restaurantId;
        this.time = time;
        this.tax = tax;
        this.delivery = delivery;
    }

    static importFromApi(apiObject): Order {
        const date: Date = new Date(apiObject.time);
        date.setHours(date.getHours() - 2);

        return new Order(apiObject.orderId, apiObject.userId, apiObject.restaurantId, date, apiObject.tax, apiObject.delivery);
    }

    public exportToApi(): Object {
        const date: Date = new Date(this.time);
        date.setHours(date.getHours() + 2);

        return {
            orderId: +this.id,
            userId: +this.userId,
            restaurantId: +this.restaurantId,
            time: date,
            tax: +this.tax,
            delivery: +this.delivery
        };
    }
}
