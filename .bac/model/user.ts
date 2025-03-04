export class User {
  declare public id:number;

  username!: string;
  password!: string;
  role!: string;

  public toString(): string {
    return this.id + ', ' + this.username.toString();
  }
}
