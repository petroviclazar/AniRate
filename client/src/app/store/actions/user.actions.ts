import { createAction, props } from '@ngrx/store';
import { User, UserModel } from '../types/user.module';

export const loginUser = createAction(
  '[Login Page] Login User',
  props<{ user: { username: string; password: string } }>()
);

export const loginUserSuccess = createAction(
  '[Login Page] Login User success',
  props<{ message: string }>()
);

export const loginUserFailure = createAction(
  '[Login Page] Login User failure',
  props<{ error: string }>()
);
export const logOutUser = createAction('[Login Page] Log out');
export const logOutUserSuccess = createAction(
  '[Login Page] Log out Success',
  props<{ message: string }>()
);
export const logOutUserFailure = createAction(
  '[Login Page] Log out Failure',
  props<{ error: string }>()
);

export const browserRolead = createAction(
  '[App component] refresh browser',
  props<{ isLoading: boolean; isLoggedin: boolean }>()
);
export const updateSliku = createAction(
  '[User] Update Sliku',
  props<{ userId: string; photo: any }>()
);
export const updateSlikuSuccess = createAction(
  '[User] Update Sliku Success',
  props<{ user: User }>()
);

export const updateSlikuFailure = createAction(
  '[User] Update Sliku Failure',
  props<{ error: string }>()
);
export const getUserStudio = createAction(
  '[AnimeStudio page] Get User',
  props<{ id: number }>()
);
export const getUserSuccess = createAction(
  '[User page] Get User Success',
  props<{ user: UserModel }>()
);
export const getUserFailure = createAction(
  '[User page] Get User Failure',
  props<{ error: string }>()
);
