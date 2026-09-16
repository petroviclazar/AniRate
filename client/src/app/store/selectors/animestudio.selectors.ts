import { AnimeStudioState } from '../types/animestudio.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAnimeStudioFeature =
  createFeatureSelector<AnimeStudioState>('animeStudio');
export const isLoadingSelector = createSelector(
  selectAnimeStudioFeature,
  (state: AnimeStudioState) => state.isLoading
);
export const animeStudioSelector = createSelector(
  selectAnimeStudioFeature,
  (state: AnimeStudioState) => state.animeStudio
);
export const errorSelector = createSelector(
  selectAnimeStudioFeature,
  (state: AnimeStudioState) => state.error
);
