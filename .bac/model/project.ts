export class Project {
  declare public id:number;

  name!: string;
  description!: string;

  public toString(): string {
    return this.id + ', ' + this.name.toString();
  }
}
