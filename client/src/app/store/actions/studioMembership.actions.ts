import { createAction, props } from '@ngrx/store';
import { StudioMembershipModel } from '../types/studio-membership.module';

export const requestMembership = createAction(
  '[AnimeStudio Page] Request Membership',
  props<{ studioId: number }>()
);
export const requestMembershipSuccess = createAction(
  '[StudioMembership API] Request Membership Success',
  props<{ membership: StudioMembershipModel; studioId: number }>()
);
export const requestMembershipFailure = createAction(
  '[StudioMembership API] Request Membership Failure',
  props<{ error: string }>()
);

export const getMembershipRequests = createAction(
  '[AnimeStudio Page] Get Membership Requests',
  props<{ studioId: number }>()
);
export const getMembershipRequestsSuccess = createAction(
  '[StudioMembership API] Get Membership Requests Success',
  props<{ requests: StudioMembershipModel[] }>()
);
export const getMembershipRequestsFailure = createAction(
  '[StudioMembership API] Get Membership Requests Failure',
  props<{ error: string }>()
);

export const getStudioMembers = createAction(
  '[AnimeStudio Page] Get Studio Members',
  props<{ studioId: number }>()
);
export const getStudioMembersSuccess = createAction(
  '[StudioMembership API] Get Studio Members Success',
  props<{ members: StudioMembershipModel[] }>()
);
export const getStudioMembersFailure = createAction(
  '[StudioMembership API] Get Studio Members Failure',
  props<{ error: string }>()
);

export const approveRequest = createAction(
  '[AnimeStudio Page] Approve Membership Request',
  props<{ requestId: number; studioId: number }>()
);
export const approveRequestSuccess = createAction(
  '[StudioMembership API] Approve Membership Request Success',
  props<{ membership: StudioMembershipModel }>()
);
export const approveRequestFailure = createAction(
  '[StudioMembership API] Approve Membership Request Failure',
  props<{ error: string }>()
);

export const rejectRequest = createAction(
  '[AnimeStudio Page] Reject Membership Request',
  props<{ requestId: number; studioId: number }>()
);
export const rejectRequestSuccess = createAction(
  '[StudioMembership API] Reject Membership Request Success',
  props<{ membership: StudioMembershipModel }>()
);
export const rejectRequestFailure = createAction(
  '[StudioMembership API] Reject Membership Request Failure',
  props<{ error: string }>()
);
