import { adapter } from '../reducers/animeStudija.reducers';
import { AnimeStudijaState } from './../types/animeStudija.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAnimeStudijaFeature =
  createFeatureSelector<AnimeStudijaState>('AnimeStudija');
export const selectorLoading = createSelector(
  selectAnimeStudijaFeature,
  (state: AnimeStudijaState) => state.isLoading
);

export const selectorAnimeStudija = createSelector(
  selectAnimeStudijaFeature,
  adapter.getSelectors().selectAll
);
export const selectorError = createSelector(
  selectAnimeStudijaFeature,
  (state: AnimeStudijaState) => state.error
);
