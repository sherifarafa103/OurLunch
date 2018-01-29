export class Order {
  userId: number;
  restaurantId: number;
  time: Date;


  constructor(owner, restaurantId, time) {
    this.userId = owner;
    this.restaurantId = restaurantId;
    this.time = time;

  }
}
