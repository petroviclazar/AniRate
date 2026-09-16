import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AnimeStudijaActions from '../actions/animeStudija.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AnimeStudijaService } from 'src/app/services/animeStudija.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'; // Dodajte ovu liniju

@Injectable()
export class AnimeStudijaEffects {
  getAnimeStudija$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeStudijaActions.getAnimeStudija),
      mergeMap(() => {
        return this.animeStudijaService.getAllAnimeStudija().pipe(
          map((mesta) => AnimeStudijaActions.getAnimeStudijaSuccess({ mesta })),
          catchError((error) =>
            of(
              AnimeStudijaActions.getAnimeStudijaFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  postAnimeStudija$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeStudijaActions.postAnimeStudija),
      mergeMap((action) =>
        this.animeStudijaService.postAnimeStudio(action.animeStudio).pipe(
          map((animeStudio) =>
            AnimeStudijaActions.postAnimeStudijaSuccess({ animeStudio })
          ),
          catchError((error) =>
            of(
              AnimeStudijaActions.postAnimeStudijaFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private animeStudijaService: AnimeStudijaService,
    private router: Router
  ) {}
}
