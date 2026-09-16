import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../types/user.interface';
import { adapter } from '../reducers/user.reducers';

export const selectUserFeature = createFeatureSelector<UserState>('user');
export const selectorLoading = createSelector(
  selectUserFeature,
  (state: UserState) => state.isLoading
);
export const selectorLoggedin = createSelector(
  selectUserFeature,
  (state: UserState) => state.isLoggedIn
);
export const selectorError = createSelector(
  selectUserFeature,
  (state: UserState) => state.error
);
export const userSelector = createSelector(
  selectUserFeature,
  (state: UserState) => state.user
);
