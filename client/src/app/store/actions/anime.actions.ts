import { createAction, props } from '@ngrx/store';
import { AnimeModel } from '../types/anime.module';

export const getAnime = createAction(
  '[Anime page] Get Anime',
  props<{ id: number }>()
);
export const getAnimeSuccess = createAction(
  '[Anime page] Get Anime Success',
  props<{ mesta: AnimeModel }>()
);
export const getAnimeFailure = createAction(
  '[Anime page] Get Anime Failure',
  props<{ error: string }>()
);
export const addAnimeToUser = createAction(
  '[Dodavanje Animea Useru] Add Anime To User',
  props<{ userId: number; animeId: number }>()
);

export const addAnimeToUserSuccess = createAction(
  '[Dodavanje Animea Useru] Add Anime To User Success',
  props<{ anime: AnimeModel }>()
);

export const addAnimeToUserFailure = createAction(
  '[Dodavanje Animea Useru] Add Anime To User Failure',
  props<{ error: string }>()
);
export const postAnime = createAction(
  '[Anime Rating page] Post Anime',
  props<{
    anime: AnimeModel;
    id: number;
  }>()
);

export const postAnimeSuccess = createAction(
  '[Anime Rating page] Post Anime Success',
  props<{
    anime: AnimeModel;
  }>()
);

export const postAnimeRFailure = createAction(
  '[Anime  page] Post Anime Failure',
  props<{ error: string }>()
);
export const updateAnime = createAction(
  '[Update Page] Update Anime',
  props<{ anime: AnimeModel }>()
);
export const updateAnimeSuccess = createAction(
  '[Update Page], Update Anime Success',
  props<{ anime: AnimeModel }>()
);
export const updateAnimeFailure = createAction(
  '[Update Page], Update Anime Failure',
  props<{ error: string }>()
);
