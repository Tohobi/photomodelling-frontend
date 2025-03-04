export class Rating {
  declare public id:number;

  score!: number;
  comment!: string;

  public toString(): string {
    return this.id.toString();
  }
}
