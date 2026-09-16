import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AnimeState } from '../types/anime.interface';
import { Anime, AnimeModel } from '../types/anime.module';
import { createReducer, on } from '@ngrx/store';
import * as animeActions from '../actions/anime.actions';
import * as animeRatingActions from '../actions/animerating.actions';

export const adapter: EntityAdapter<AnimeModel> =
  createEntityAdapter<AnimeModel>();
export const initialState: EntityState<Anime> = adapter.getInitialState({
  isLoading: false,
  anime: null,
  error: null,
});
export const reducer4 = createReducer(
  initialState,
  on(animeActions.getAnime, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeActions.getAnimeSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    anime: action.mesta,
  })),
  on(animeActions.getAnimeFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(animeActions.addAnimeToUser, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(animeActions.addAnimeToUserSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.anime, state),
    };
  }),
  on(animeActions.addAnimeToUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(animeActions.postAnime, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(animeActions.postAnimeSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.anime, state),
    };
  }),
  on(animeActions.postAnimeRFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
 
  on(animeRatingActions.postAnimeRating, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeRatingActions.postAnimeRatingSuccess, (state, action) => {
    return adapter.addOne(action.animeRating, { ...state, isLoading: false });
  }),
  on(animeActions.updateAnime, (state) => ({ ...state, isLoading: true })),
  on(animeActions.updateAnimeSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    anime: action.anime,
  })),
  on(animeActions.updateAnimeFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
