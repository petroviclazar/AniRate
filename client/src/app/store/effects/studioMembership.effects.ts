import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { StudioMembershipService } from '../../services/studio-membership.service';
import * as StudioMembershipActions from '../actions/studioMembership.actions';

@Injectable()
export class StudioMembershipEffects {
  requestMembership$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudioMembershipActions.requestMembership),
      mergeMap((action) =>
        this.membershipService.requestMembership(action.studioId).pipe(
          map((membership) =>
            StudioMembershipActions.requestMembershipSuccess({
              membership,
              studioId: action.studioId,
            })
          ),
          catchError((error) =>
            of(
              StudioMembershipActions.requestMembershipFailure({
                error: error.error?.message || 'Zahtev za clanstvo nije uspeo',
              })
            )
          )
        )
      )
    )
  );

  requestMembershipFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StudioMembershipActions.requestMembershipFailure),
        tap((action) => alert(action.error))
      ),
    { dispatch: false }
  );

  getMembershipRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudioMembershipActions.getMembershipRequests),
      mergeMap((action) =>
        this.membershipService.getRequestsForStudio(action.studioId).pipe(
          map((requests) =>
            StudioMembershipActions.getMembershipRequestsSuccess({
              requests,
            })
          ),
          catchError((error) =>
            of(
              StudioMembershipActions.getMembershipRequestsFailure({
                error: error.error?.message || error.message,
              })
            )
          )
        )
      )
    )
  );

  approveRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudioMembershipActions.approveRequest),
      mergeMap((action) =>
        this.membershipService.approveRequest(action.requestId).pipe(
          map((membership) =>
            StudioMembershipActions.approveRequestSuccess({ membership })
          ),
          catchError((error) =>
            of(
              StudioMembershipActions.approveRequestFailure({
                error: error.error?.message || error.message,
              })
            )
          )
        )
      )
    )
  );

  rejectRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudioMembershipActions.rejectRequest),
      mergeMap((action) =>
        this.membershipService.rejectRequest(action.requestId).pipe(
          map((membership) =>
            StudioMembershipActions.rejectRequestSuccess({ membership })
          ),
          catchError((error) =>
            of(
              StudioMembershipActions.rejectRequestFailure({
                error: error.error?.message || error.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private membershipService: StudioMembershipService
  ) {}
}
