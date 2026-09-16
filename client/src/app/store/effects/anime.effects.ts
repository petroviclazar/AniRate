import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AnimeStudijaService } from 'src/app/services/animeStudija.service';
import * as AnimeActions from '../actions/anime.actions';
import { Injectable } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';
@Injectable()
export class AnimeEffects {
  getAnime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeActions.getAnime),
      mergeMap((action) => {
        return this.animeService.getAnimeByStudio(action.id).pipe(
          map((mesta) => AnimeActions.getAnimeSuccess({ mesta })),
          catchError((error) =>
            of(AnimeActions.getAnimeFailure({ error: error.message }))
          )
        );
      })
    )
  );
  addAnimeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeActions.addAnimeToUser),
      switchMap((action) => {
        return this.animeService
          .addAnimeToUser(action.userId, action.animeId)
          .pipe(
            map((anime) => AnimeActions.addAnimeToUserSuccess({ anime })),
            catchError((error) =>
              of(AnimeActions.addAnimeToUserFailure({ error: error.message }))
            )
          );
      })
    )
  );
  postAnime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimeActions.postAnime),
      switchMap((action) => {
        return this.animeService.postAnime(action.anime, action.id).pipe(
          map(() =>
            AnimeActions.postAnimeSuccess({
              anime: action.anime, // Ispravljeno animeRating.animeRating
            })
          ),
          catchError((error) =>
            of(
              AnimeActions.postAnimeRFailure({
                error: error.message,
              })
            )
          )
        );
      })
    )
  );
  // putAnime$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AnimeActions.updateAnime),
  //     mergeMap((action) =>
  //       this.animeService.updateAnime(action.anime).pipe(
  //         map((anime) => AnimeActions.updateAnimeSuccess({ anime })),
  //         catchError((error) =>
  //           of(
  //             AnimeActions.updateAnimeFailure({
  //               error: error.message,
  //             })
  //           )
  //         )
  //       )
  //     )
  //   )
  // );
  constructor(
    private actions$: Actions,
    private animeService: AnimeService,
    private router: Router
  ) {}
}
