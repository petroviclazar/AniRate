import { createAction, props } from '@ngrx/store';
import { AnimeStudioModel } from '../types/animestudio.module';

export const getAnimeStudija = createAction(
  '[AnimeStudija Page] Get Anime Studija'
);

export const getAnimeStudijaSuccess = createAction(
  '[AnimeStudija API] Get Anime Studija Success',
  props<{ mesta: AnimeStudioModel[] }>()
);

export const getAnimeStudijaFailure = createAction(
  '[AnimeStudija API] Get Anime Studija Failure',
  props<{ error: string }>()
);
export const postAnimeStudija = createAction(
  '[AnimeStudija Page] Post Anime Studija',
  props<{ animeStudio: AnimeStudioModel }>()
);

export const postAnimeStudijaSuccess = createAction(
  '[AnimeStudija API] Post Anime Studija Success',
  props<{ animeStudio: AnimeStudioModel }>()
);

export const postAnimeStudijaFailure = createAction(
  '[AnimeStudija API] Post Anime Studija Failure',
  props<{ error: string }>()
);
