export class Meal {
    mealId: number;
    retaurantId: number;
    name: string;

    constructor(mealId: number, retaurantId: number, name: string) {
        this.mealId = mealId;
        this.retaurantId = retaurantId;
        this.name = name;
    }
}
