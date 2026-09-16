import { AnimeRatingState } from '../types/animerating.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAnimeRatingFeature =
  createFeatureSelector<AnimeRatingState>('AnimeRating');
export const isLoadingRatingSelector = createSelector(
  selectAnimeRatingFeature,
  (state: AnimeRatingState) => state.isLoading
);
export const animeRatingSelector = createSelector(
  selectAnimeRatingFeature,
  (state: AnimeRatingState) => state.animerating
);
export const errorRatingSelector = createSelector(
  selectAnimeRatingFeature,
  (state: AnimeRatingState) => state.error
);
