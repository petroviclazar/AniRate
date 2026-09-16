import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as animeKomentarActions from '../actions/animekomentar.actions';
import { Injectable } from '@angular/core';
import { AnimeKomentarService } from 'src/app/services/animekomentar.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AnimeKomentarEffects {
  postAnimeKomentar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(animeKomentarActions.postAnimeKomentar),
      switchMap((action) => {
        return this.animeKomentarService
          .postAnimeKomentar(action.komentar, action.id, action.userId)
          .pipe(
            map(() =>
              animeKomentarActions.postAnimeKomentarSuccess({
                komentar: action.komentar,
              })
            ),
            catchError((error) =>
              of(
                animeKomentarActions.postAnimeKomentarFailure({
                  error: error.message,
                })
              )
            )
          );
      })
    )
  );
  getAnimeKomentar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(animeKomentarActions.getAnimeKomentar),
      mergeMap((action) => {
        return this.animeKomentarService.getKomentar(action.id).pipe(
          map((komentar) =>
            animeKomentarActions.getAnimeKomentarSuccess({ komentar })
          ),
          catchError((error) =>
            of(
              animeKomentarActions.getAnimeKomentarFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  removeKomentar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(animeKomentarActions.deleteComment),
      mergeMap((action) => {
        return this.animeKomentarService.deleteKomentar(action.id).pipe(
          map((id) =>
            animeKomentarActions.deleteCommentSuccess({ id: action.id })
          ),
          catchError((error) =>
            of(
              animeKomentarActions.deleteCommentFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private animeKomentarService: AnimeKomentarService,
    private router: Router
  ) {}
}
