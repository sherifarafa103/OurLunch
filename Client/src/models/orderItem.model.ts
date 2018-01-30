export class OrderItem {
    orderId: number;
    userId: number;
    mealId: number;
    price: number;


    constructor(orderId, userId, mealId, price: number = 0) {
        this.orderId = orderId;
        this.userId = userId;
        this.mealId = mealId;
        this.price = price;
    }
}
