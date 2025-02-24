export class Note {
  declare public id:number;

  text!: string;

  public toString(): string {
    return this.id.toString();
  }
}
