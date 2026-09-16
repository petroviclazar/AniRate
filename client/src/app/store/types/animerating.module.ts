import { Anime } from './anime.module';
import { User } from './user.module';

export interface AnimeRating {
  id?: number;
  animeRating?: number;
  anime?: Anime;
  user?: User;
}
export class AnimeRatingModel implements AnimeRating {
  id?: number;
  animeRating?: number;
  anime?: Anime;
  user?: User;
  constructor(id?: number, animeRating?: number, anime?: Anime, user?: User) {
    this.id = id;
    this.animeRating = animeRating;
    this.anime = anime;
    this.user = user;
  }
}
