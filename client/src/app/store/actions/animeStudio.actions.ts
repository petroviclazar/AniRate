import { createAction, props } from '@ngrx/store';
import { AnimeStudioModel } from '../types/animestudio.module';

export const getAnimeStudio = createAction(
  '[AnimeStudio page] Get AnimeStudio',
  props<{ id: number }>()
);
export const getAnimeStudioSuccess = createAction(
  '[AnimeStudio page] Get AnimeStudio Success',
  props<{ animeStudio: AnimeStudioModel }>()
);
export const getAnimeStudioFailure = createAction(
  '[AnimeStudio page] Get AnimeStudio Failure',
  props<{ error: string }>()
);
