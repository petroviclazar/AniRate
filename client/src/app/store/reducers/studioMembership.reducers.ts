import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { StudioMembershipModel } from '../types/studio-membership.module';
import { StudioMembershipState } from '../types/studio-membership.interface';
import { createReducer, on } from '@ngrx/store';
import * as StudioMembershipActions from '../actions/studioMembership.actions';

export const membershipAdapter: EntityAdapter<StudioMembershipModel> =
  createEntityAdapter<StudioMembershipModel>();

export const initialState: StudioMembershipState =
  membershipAdapter.getInitialState({
    isLoading: false,
    error: null,
  });

export const studioMembershipReducer = createReducer(
  initialState,
  on(StudioMembershipActions.requestMembership, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(StudioMembershipActions.requestMembershipSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(StudioMembershipActions.requestMembershipFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(StudioMembershipActions.getMembershipRequests, (state) => ({
    ...state,
    isLoading: true,
  })),
  // upsertMany (a ne setAll): u istoj kolekciji drzimo i zahteve i clanove,
  // pa ne smemo da obrisemo jedno kad stigne drugo. Selectori ih posle
  // razdvajaju po studiju i statusu.
  on(StudioMembershipActions.getMembershipRequestsSuccess, (state, action) =>
    membershipAdapter.upsertMany(action.requests, {
      ...state,
      isLoading: false,
    })
  ),
  on(
    StudioMembershipActions.getMembershipRequestsFailure,
    (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  on(StudioMembershipActions.getStudioMembersSuccess, (state, action) =>
    membershipAdapter.upsertMany(action.members, state)
  ),
  on(StudioMembershipActions.getStudioMembersFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(StudioMembershipActions.approveRequestSuccess, (state, action) =>
    membershipAdapter.updateOne(
      { id: action.membership.id as number, changes: action.membership },
      state
    )
  ),
  on(StudioMembershipActions.rejectRequestSuccess, (state, action) =>
    membershipAdapter.updateOne(
      { id: action.membership.id as number, changes: action.membership },
      state
    )
  )
);
