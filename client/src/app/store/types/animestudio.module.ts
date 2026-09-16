export interface AnimeStudio {
  id?: number;
  name?: string;
  slika?: string;
}
export class AnimeStudioModel implements AnimeStudio {
  id?: number;
  name?: string;
  slika?: string;

  constructor(id?: number, name?: string, slika?: string) {
    this.id = id;
    this.name = name;
    this.slika = slika;
  }
}
