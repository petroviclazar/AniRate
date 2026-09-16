import { createAction, props } from '@ngrx/store';
import { AnimeKomentarModel } from '../types/animekomentar.module';

export const postAnimeKomentar = createAction(
  '[Anime Komentar page] Post Anime Komentar',
  props<{
    komentar: AnimeKomentarModel;
    id: number;
    userId: number;
  }>()
);

export const postAnimeKomentarSuccess = createAction(
  '[Anime Komentar page] Post Anime Komentar Success',
  props<{
    komentar: AnimeKomentarModel;
  }>()
);

export const postAnimeKomentarFailure = createAction(
  '[Anime Komentar page] Post Anime Komentar Failure',
  props<{ error: string }>()
);
export const getAnimeKomentar = createAction(
  '[AnimeKomentar Page] Get Anime Komentar',
  props<{ id: number }>()
);

export const getAnimeKomentarSuccess = createAction(
  '[AnimeKomentar API] Get Anime Komentar Success',
  props<{ komentar: AnimeKomentarModel[] }>()
);

export const getAnimeKomentarFailure = createAction(
  '[AnimeKomentar API] Get Anime Komentar Failure',
  props<{ error: string }>()
);
export const deleteComment = createAction(
  '[Komentari Page] Delete komentar',
  props<{ id: number }>()
);
export const deleteCommentSuccess = createAction(
  '[Komentari Page] Delete Komentar Success',
  props<{ id: number }>()
);
export const deleteCommentFailure = createAction(
  '[Komentari Page] Delete Komentar Failure',
  props<{ error: string }>()
);
