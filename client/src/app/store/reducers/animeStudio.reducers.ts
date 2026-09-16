import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AnimeStudioState } from '../types/animestudio.interface';
import { AnimeStudioModel } from '../types/animestudio.module';
import { createReducer, on } from '@ngrx/store';
import * as animeStudioActions from '../actions/animeStudio.actions';
export const adapter: EntityAdapter<AnimeStudioModel> =
  createEntityAdapter<AnimeStudioModel>();

export const initialState: AnimeStudioState = adapter.getInitialState({
  isLoading: false,
  animeStudio: null,
  error: null,
});
export const reducers3 = createReducer(
  initialState,
  on(animeStudioActions.getAnimeStudio, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeStudioActions.getAnimeStudioSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    animeStudio: action.animeStudio,
  })),
  on(animeStudioActions.getAnimeStudioFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
