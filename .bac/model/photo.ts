export class Photo {
  declare public id:number;

  filename!: string;
  filepath!: string;

  public toString(): string {
    return this.id + ', ' + this.filename.toString();
  }
}
