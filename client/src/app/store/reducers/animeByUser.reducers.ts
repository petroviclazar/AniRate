import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AnimeModel } from '../types/anime.module';
import { createReducer, on } from '@ngrx/store';
import * as animeiActions from '../actions/animei.actions';
import { AnimeiState } from '../types/animei.interface';

export const byUserAdapter: EntityAdapter<AnimeModel> =
  createEntityAdapter<AnimeModel>();

export const byUserInitialState: AnimeiState = byUserAdapter.getInitialState({
  isLoading: false,
  error: null,
  update: false,
});

export const animeByUserReducer = createReducer(
  byUserInitialState,
  on(animeiActions.getAnimeForUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeiActions.getAnimeForUserSuccess, (state, action) => {
    return byUserAdapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(animeiActions.getAnimeForUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);