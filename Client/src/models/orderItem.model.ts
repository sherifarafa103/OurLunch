import { IResource } from "../interfaces/IResource";

export class OrderItem implements IResource {
    id: number;
    orderId: number;
    userId: number;
    mealId: number;
    price: number;
    quantity: number;
    notes: string;

    constructor(id: number, orderId: number, userId: number, mealId: number, price: number = 0, quantity: number = 0, notes: string = '') {
        this.id = id;
        this.orderId = orderId;
        this.userId = userId;
        this.mealId = mealId;
        this.price = price;
        this.quantity = quantity;
        this.notes = notes;
    }

    static importFromApi(apiObject): OrderItem {
        return new OrderItem(
            apiObject.orderItemId,
            apiObject.orderId,
            apiObject.userId,
            apiObject.mealId,
            apiObject.price,
            apiObject.quantity,
            apiObject.notes
        );
    }

    public exportToApi(): Object {
        return {
            orderItemId: +this.id,
            orderId: +this.orderId,
            userId: +this.userId,
            mealId: +this.mealId,
            price: +this.price,
            quantity: +this.quantity,
            notes: this.notes
        };
    }
}
