export class Meal {
  mealId: number;
  name: string;
  retaurantId: number;

  constructor(mealId, name, retaurantId) {
    this.mealId = mealId;
    this.name = name;
    this.retaurantId = retaurantId;
  }
}
