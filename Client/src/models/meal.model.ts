import { IResource } from "../interfaces/IResource";

export class Meal implements IResource {
    id: number;
    restaurantId: number;
    name: string;

    constructor(id: number, restaurantId: number, name: string) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.name = name;
    }

    static importFromApi(apiObject): Meal {
        return new Meal(apiObject.mealId, apiObject.restaurantId, apiObject.name);
    }

    public exportToApi(): Object {
        return {
            mealId: +this.id,
            restaurantId: +this.restaurantId,
            name: this.name
        };
    }
}
