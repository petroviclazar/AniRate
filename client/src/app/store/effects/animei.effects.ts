import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AnimeiActions from '../actions/animei.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AnimeService } from 'src/app/services/anime.service';
import { Router } from '@angular/router';
import { AnimeModel } from '../types/anime.module';

@Injectable()
export class AnimeiEffects {
  getAnimei$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeiActions.getAnimei),
      mergeMap(() => {
        return this.animeService.getAllAnime().pipe(
          map((mesta) => AnimeiActions.getAnimeiSuccess({ mesta })),
          catchError((error) =>
            of(
              AnimeiActions.getAnimeiFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  getAnimeFromStudio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeiActions.getAnimeForStudio),
      mergeMap((action) => {
        return this.animeService.getAnimeForStudio(action.id).pipe(
          map((mesta) => AnimeiActions.getAnimeForStudioSuccess({ mesta })),
          catchError((error) =>
            of(AnimeiActions.getAnimeForStudioFailure({ error: error.message }))
          )
        );
      })
    )
  );
  getAnimeFromUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeiActions.getAnimeForUser),
      mergeMap((action) => {
        return this.animeService.getAnimeForUser(action.id).pipe(
          map((mesta) => AnimeiActions.getAnimeForUserSuccess({ mesta })),
          catchError((error) =>
            of(AnimeiActions.getAnimeForUserFailure({ error: error.message }))
          )
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private animeService: AnimeService,
    private router: Router
  ) {}
}
