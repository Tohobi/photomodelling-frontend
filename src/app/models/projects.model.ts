export interface Project {
  id: number;
  name: string;
  description: string;
  user:
    {"id": number,"username": string,"password":string,"role": string};
  ratings: [];
}
