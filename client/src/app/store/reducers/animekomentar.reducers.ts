import { createReducer, on } from '@ngrx/store';
import * as animeKometarActions from '../actions/animekomentar.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { AnimeKomentar } from '../types/animekomentar.module';
import { AnimeKomentarState } from '../types/animekomentar.interface';

export const adapter: EntityAdapter<AnimeKomentar> =
  createEntityAdapter<AnimeKomentar>();

export const initialState: EntityState<AnimeKomentar> = adapter.getInitialState(
  {
    isLoading: false,
    error: null,
  }
);

export const reducer10 = createReducer(
  initialState,
  on(animeKometarActions.postAnimeKomentar, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(animeKometarActions.postAnimeKomentarSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      ...adapter.upsertOne(action.komentar, state),
    };
  }),
  on(animeKometarActions.postAnimeKomentarFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(animeKometarActions.getAnimeKomentar, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeKometarActions.getAnimeKomentarSuccess, (state, action) => {
    return adapter.setAll(action.komentar, { ...state, isLoading: false });
  }),
  on(animeKometarActions.getAnimeKomentarFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(animeKometarActions.deleteComment, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeKometarActions.deleteCommentSuccess, (state, action) => {
    return adapter.removeOne(action.id, { ...state, isLoading: false });
  }),
  on(animeKometarActions.deleteCommentFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
