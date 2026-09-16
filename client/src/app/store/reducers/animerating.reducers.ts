import { createReducer, on } from '@ngrx/store';
import * as animeRatingActions from '../actions/animerating.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AnimeRating } from '../types/animerating.module';
import { AnimeRatingState } from '../types/animerating.interface';

export const adapter: EntityAdapter<AnimeRating> =
  createEntityAdapter<AnimeRating>();

export const initialState: EntityState<AnimeRating> = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export const reducer8 = createReducer(
  initialState,
  on(animeRatingActions.postAnimeRating, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(animeRatingActions.postAnimeRatingSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.animeRating, state),
    };
  }),
  on(animeRatingActions.postAnimeRatingFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
