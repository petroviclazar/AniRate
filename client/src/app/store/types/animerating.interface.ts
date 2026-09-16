import { AnimeRating } from './animerating.module';

export interface AnimeRatingState {
  isLoading: boolean;
  animerating: AnimeRating | null;
  error: string | null;
}
