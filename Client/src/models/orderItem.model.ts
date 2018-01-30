import { IResource } from "../interfaces/IResource";

export class OrderItem implements IResource {
    id: number;
    orderId: number;
    userId: number;
    mealId: number;
    price: number;


    constructor(id: number, orderId: number, userId: number, mealId: number, price: number = 0) {
        this.orderId = orderId;
        this.userId = userId;
        this.mealId = mealId;
        this.price = price;
    }

    static importFromApi(apiObject): OrderItem {
        return new OrderItem(apiObject.orderItemId, apiObject.orderId, apiObject.userId, apiObject.mealId, apiObject.price);
    }

    public exportToApi(): Object {
        return {
            orderItemId: this.id,
            orderId: this.id,
            userId: this.userId,
            mealId: this.mealId,
            price: this.price
        };
    }
}
