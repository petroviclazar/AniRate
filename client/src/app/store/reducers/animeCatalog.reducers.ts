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
    total: 0,
    currentPage: 1,
  }
);

export const animeCatalogReducer = createReducer(
  catalogInitialState,
  on(animeiActions.getAnimei, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(animeiActions.getAnimeiSuccess, (state, action) => {
    // Prva stranica zamenjuje ceo katalog (setAll), a svaka sledeca se
    // samo dodaje postojecim entitetima (addMany) - tako se u NgRx store-u
    // u svakom trenutku drzi samo ono sto je korisnik zaista ucitao
    // ("Ucitaj jos"), a ne ceo katalog odjednom.
    const noviState =
      action.page === 1
        ? catalogAdapter.setAll(action.mesta, state)
        : catalogAdapter.addMany(action.mesta, state);
    return {
      ...noviState,
      isLoading: false,
      total: action.total,
      currentPage: action.page,
    };
  }),
  on(animeiActions.getAnimeiFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);