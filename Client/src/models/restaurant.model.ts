import { IResource } from "../interfaces/IResource";

export class Restaurant implements IResource {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static importFromApi(apiObject): Restaurant {
        return new Restaurant(apiObject.restaurantId, apiObject.name);
    }

    public exportToApi(): Object {
        return {
            restaurantId: +this.id,
            name: this.name
        };
    }
}
