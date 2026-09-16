import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as animeRatingActions from '../actions/animerating.actions';
import { Injectable } from '@angular/core';
import { AnimeRatingService } from 'src/app/services/animerating.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AnimeRatingModel } from '../types/animerating.module';

@Injectable()
export class AnimeRatingEffects {
  postAnimeRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(animeRatingActions.postAnimeRating),
      switchMap((action) => {
        return this.animeRatingService
          .postAnimeRating(action.animeRating, action.id, action.userId)
          .pipe(
            map(() =>
              animeRatingActions.postAnimeRatingSuccess({
                animeRating: action.animeRating, 
              })
            ),
            catchError((error) =>
              of(
                animeRatingActions.postAnimeRatingFailure({
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
    private animeRatingService: AnimeRatingService,
    private router: Router
  ) {}
}
