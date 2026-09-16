import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AnimeStudijaService } from 'src/app/services/animeStudija.service';
import * as AnimeStudioActions from '../actions/animeStudio.actions';
import { Injectable } from '@angular/core';
@Injectable()
export class AnimeStudioEffects {
  getAnimeStudio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeStudioActions.getAnimeStudio),
      mergeMap((action) => {
        return this.animeStudijaService.getAnimeStudioId(action.id).pipe(
          map((animeStudio) =>
            AnimeStudioActions.getAnimeStudioSuccess({ animeStudio })
          ),
          catchError((error) =>
            of(
              AnimeStudioActions.getAnimeStudioFailure({ error: error.message })
            )
          )
        );
      })
    )
  );
  getAnimeStudioFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeStudioActions.getAnimeStudioFailure),
      tap(() => alert('Greska pri pribavljanju anime studija'))
    )
  );
  constructor(
    private actions$: Actions,
    private animeStudijaService: AnimeStudijaService,
    private router: Router
  ) {}
}
