import { adapter } from '../reducers/animekomentar.reducers';
import { AnimeKomentarState } from '../types/animekomentar.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAnimeKomentarFeature =
  createFeatureSelector<AnimeKomentarState>('AnimeKomentar');
export const isLoadingAnimeKomentarSelector = createSelector(
  selectAnimeKomentarFeature,
  (state: AnimeKomentarState) => state.isLoading
);

export const animeKomentarSelector = createSelector(
  selectAnimeKomentarFeature,
  adapter.getSelectors().selectAll
);

export const errorAnimeKomentarSelector = createSelector(
  selectAnimeKomentarFeature,
  (state: AnimeKomentarState) => state.error
);
