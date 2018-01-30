import { IResource } from "../interfaces/IResource";

export class User implements IResource {
    id: number;
    firstName: string;
    lastName: string;
    alias: string;

    constructor(id: number, alias: string = "", firstName: string = "", lastName: string = "") {
        this.id = id;
        this.alias = alias;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    static importFromApi(apiObject): User {
        return new User(apiObject.userId, apiObject.firstName, apiObject.lastName, apiObject.alias);
    }

    public exportToApi(): Object {
        return {
            userId: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            alias: this.alias
        };
    }
}
