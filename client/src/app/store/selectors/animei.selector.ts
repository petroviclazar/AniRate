import { AnimeiState } from './../types/animei.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { catalogAdapter } from '../reducers/animeCatalog.reducers';
import { byStudioAdapter } from '../reducers/animeByStudio.reducers';
import { byUserAdapter } from '../reducers/animeByUser.reducers';

// --- Katalog (Header / Pocetna stranica) ---
export const selectAnimeCatalogFeature =
  createFeatureSelector<AnimeiState>('AnimeCatalog');

export const headerSelectorLoading = createSelector(
  selectAnimeCatalogFeature,
  (state: AnimeiState) => state.isLoading
);
export const headerSelectorAnime = createSelector(
  selectAnimeCatalogFeature,
  catalogAdapter.getSelectors().selectAll
);
export const headerSelectorError = createSelector(
  selectAnimeCatalogFeature,
  (state: AnimeiState) => state.error
);

// --- Anime po studiju (AnimestudioComponent) ---
export const selectAnimeByStudioFeature =
  createFeatureSelector<AnimeiState>('AnimeByStudio');

export const animestudioSelectorLoading = createSelector(
  selectAnimeByStudioFeature,
  (state: AnimeiState) => state.isLoading
);
export const animestudioSelectorAnime = createSelector(
  selectAnimeByStudioFeature,
  byStudioAdapter.getSelectors().selectAll
);
export const animestudioSelectorError = createSelector(
  selectAnimeByStudioFeature,
  (state: AnimeiState) => state.error
);

// --- Anime liste korisnika (ProfileComponent) ---
export const selectAnimeByUserFeature =
  createFeatureSelector<AnimeiState>('AnimeByUser');

export const animeuserSelectorLoading = createSelector(
  selectAnimeByUserFeature,
  (state: AnimeiState) => state.isLoading
);
export const animeuserSelectorAnime = createSelector(
  selectAnimeByUserFeature,
  byUserAdapter.getSelectors().selectAll
);
export const animeuserSelectorError = createSelector(
  selectAnimeByUserFeature,
  (state: AnimeiState) => state.error
);