import { UserModel } from './user.module';

export interface AnimeStudio {
  id?: number;
  name?: string;
  slika?: string;
  owner?: UserModel | null;
}
export class AnimeStudioModel implements AnimeStudio {
  id?: number;
  name?: string;
  slika?: string;
  owner?: UserModel | null;

  constructor(
    id?: number,
    name?: string,
    slika?: string,
    owner?: UserModel | null
  ) {
    this.id = id;
    this.name = name;
    this.slika = slika;
    this.owner = owner;
  }
}
