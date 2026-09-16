import { createAction, props } from '@ngrx/store';
import { AnimeRatingModel } from '../types/animerating.module';

export const postAnimeRating = createAction(
  '[Anime Rating page] Post Anime Rating',
  props<{
    animeRating: AnimeRatingModel;
    id: number;
    userId: number;
  }>()
);

export const postAnimeRatingSuccess = createAction(
  '[Anime Rating page] Post Anime Rating Success',
  props<{
    animeRating: AnimeRatingModel;
  }>()
);

export const postAnimeRatingFailure = createAction(
  '[Anime Rating page] Post Anime Rating Failure',
  props<{ error: string }>()
);
