export class Order {
    orderId: number;
    userId: number;
    restaurantId: number;
    time: Date;

    constructor(ownerId: number, restaurantId: number, time: Date) {
        this.userId = ownerId;
        this.restaurantId = restaurantId;
        this.time = time;
    }
}
