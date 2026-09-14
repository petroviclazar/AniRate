import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AnimeModel } from '../types/anime.module';
import { createReducer, on } from '@ngrx/store';
import * as animeiActions from '../actions/animei.actions';
import * as animeActions from '../actions/anime.actions';
import { AnimeiState } from '../types/animei.interface';

export const byStudioAdapter: EntityAdapter<AnimeModel> =
  createEntityAdapter<AnimeModel>();

export const byStudioInitialState: AnimeiState = byStudioAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
    update: false,
  }
);

export const animeByStudioReducer = createReducer(
  byStudioInitialState,
  on(animeiActions.getAnimeForStudio, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeiActions.getAnimeForStudioSuccess, (state, action) => {
    return byStudioAdapter.setAll(action.mesta, {
      ...state,
      isLoading: false,
    });
  }),
  on(animeiActions.getAnimeForStudioFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(animeActions.postAnime, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeActions.postAnimeSuccess, (state, action) => {
    return byStudioAdapter.addOne(action.anime, { ...state, isLoading: false });
  })
);