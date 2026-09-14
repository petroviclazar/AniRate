import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserModel } from '../types/user.module';
import { UserState } from '../types/user.interface';
import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

export const adapter: EntityAdapter<UserModel> =
  createEntityAdapter<UserModel>();

export const initialState: UserState = adapter.getInitialState({
  isLoading: false,
  isLoggedIn: false,
  error: null,
  user: null,
});

export const reducers = createReducer(
  initialState,
  on(userActions.loginUser, (state) => ({ ...state, isLoading: true })),
  on(userActions.loginUserSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
  })),
  on(userActions.loginUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    error: action.error,
  })),
  on(userActions.logOutUser, (state) => ({ ...state, isLoading: true })),
  on(userActions.logOutUserSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    user: null,
  })),
  on(userActions.logOutUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(userActions.browserRolead, (state, action) => ({
    ...state,
    isLoading: action.isLoading,
    isLoggedIn: action.isLoggedin,
  })),
  on(userActions.updateSliku, (state) => ({ ...state, isLoading: true })),
  on(userActions.updateSlikuSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    user: action.user,
  })),
  on(userActions.updateSlikuFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(userActions.getUserStudio, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(userActions.getUserSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    user: action.user,
  })),
  on(userActions.getUserFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);