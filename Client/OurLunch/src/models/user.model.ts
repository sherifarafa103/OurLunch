export class User {
  firstName: string;
  lastName: string;
  alias: string;

  constructor(alias: string = "", firstName: string = "", lastName: string = "") {
    this.alias = alias;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
