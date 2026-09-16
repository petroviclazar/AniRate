import { Anime } from './anime.module';

export interface AnimeState {
  isLoading: boolean;
  anime: Anime | null;
  error: string | null;
}
