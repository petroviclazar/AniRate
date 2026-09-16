import { AnimeStudio } from './animestudio.module';

export interface Anime {
  id?: number;
  name?: string;
  rating?: number;
  title?: string;
  description?: string;
  episodeCount?: number;
  studio?: AnimeStudio;
}
export class AnimeModel implements Anime {
  id?: number;
  name?: string;
  rating?: number;
  title?: string;
  description?: string;
  episodeCount?: number;
  studio?: AnimeStudio;
  constructor(
    id?: number,
    name?: string,
    rating?: number,
    title?: string,
    description?: string,
    episodeCount?: number,
    studio?: AnimeStudio
  ) {
    this.id = id;
    this.name = name;
    this.rating = rating;
    this.title = title;
    this.description = description;
    this.episodeCount = episodeCount;
    this.studio = studio;
  }
}
