import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AnimeModel } from '../types/anime.module';
import { createReducer, on } from '@ngrx/store';
import * as animeiActions from '../actions/animei.actions';
import { AnimeiState } from '../types/animei.interface';

export const catalogAdapter: EntityAdapter<AnimeModel> =
  createEntityAdapter<AnimeModel>();

export const catalogInitialState: AnimeiState = catalogAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
    update: false,
  }
);

export const animeCatalogReducer = createReducer(
  catalogInitialState,
  on(animeiActions.getAnimei, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeiActions.getAnimeiSuccess, (state, action) => {
    return catalogAdapter.setAll(action.mesta, { ...state, isLoading: false });
  }),
  on(animeiActions.getAnimeiFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);