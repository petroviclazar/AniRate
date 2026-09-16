import { Anime } from './anime.module';
import { User } from './user.module';

export interface AnimeKomentar {
  id?: number;
  komentar?: string;
  anime?: Anime;
  user?: User;
}
export class AnimeKomentarModel implements AnimeKomentar {
  id?: number;
  komentar?: string;
  anime?: Anime;
  user?: User;
  constructor(id?: number, komentar?: string, anime?: Anime, user?: User) {
    this.id = id;
    this.komentar = komentar;
    this.anime = anime;
    this.user = user;
  }
}
