import { AnimeState } from '../types/anime.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAnimeFeature = createFeatureSelector<AnimeState>('Anime');
export const isLoadingSelector = createSelector(
  selectAnimeFeature,
  (state: AnimeState) => state.isLoading
);
export const animeSelector = createSelector(
  selectAnimeFeature,
  (state: AnimeState) => state.anime
);
export const errorSelector = createSelector(
  selectAnimeFeature,
  (state: AnimeState) => state.error
);