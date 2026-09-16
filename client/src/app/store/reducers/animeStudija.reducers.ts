import { AnimeStudijaState } from '../types/animeStudija.interface';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AnimeStudioModel } from '../types/animestudio.module';
import { createReducer, on } from '@ngrx/store';
import * as animeStudijaActions from '../actions/animeStudija.actions';
import * as animeStudioActions from '../actions/animeStudio.actions';
export const adapter: EntityAdapter<AnimeStudioModel> =
  createEntityAdapter<AnimeStudioModel>();

export const initialState: AnimeStudijaState = adapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
});

export const reducers2 = createReducer(
  initialState,
  on(animeStudijaActions.getAnimeStudija, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeStudijaActions.getAnimeStudijaSuccess, (state, action) => {
    return adapter.addMany(action.mesta, { ...state, isLoading: false });
  }),
  on(animeStudijaActions.getAnimeStudijaFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(animeStudijaActions.postAnimeStudijaSuccess, (state, action) => {
    return adapter.addOne(action.animeStudio, { ...state, isLoading: false });
  }),

  on(animeStudijaActions.postAnimeStudijaFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
