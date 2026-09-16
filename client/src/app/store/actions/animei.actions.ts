import { createAction, props } from '@ngrx/store';
import { AnimeModel } from '../types/anime.module';

export const getAnimei = createAction('[Anime Page] Get Anime');
export const getAnimeiSuccess = createAction(
  '[Anime Page] Get Anime Success',
  props<{ mesta: AnimeModel[] }>()
);
export const getAnimeiFailure = createAction(
  '[Anime Page] Get Anime Failure',
  props<{ error: string }>()
);
export const getAnimeForStudio = createAction(
  '[AnimeFromStudio page] getAnime',
  props<{ id: number }>()
);
export const getAnimeForStudioSuccess = createAction(
  '[Anime/API] Get Anime For Studio Success',
  props<{ mesta: AnimeModel[] }>()
);
export const getAnimeForStudioFailure = createAction(
  '[AnimeFromStudio page] Get Anime Failure',
  props<{ error: string }>()
);

export const getAnimeForUser = createAction(
  '[Get Anime For User page] getAnime',
  props<{ id: number }>()
);
export const getAnimeForUserSuccess = createAction(
  '[Get Anime For User] Get Anime For Studio Success',
  props<{ mesta: AnimeModel[] }>()
);
export const getAnimeForUserFailure = createAction(
  '[Get Anime For User] Get Anime Failure',
  props<{ error: string }>()
);
