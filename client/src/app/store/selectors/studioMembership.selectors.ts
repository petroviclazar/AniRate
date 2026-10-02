import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudioMembershipState } from '../types/studio-membership.interface';
import { membershipAdapter } from '../reducers/studioMembership.reducers';
import { MembershipStatus } from '../types/membership-status.enum';

export const selectStudioMembershipFeature =
  createFeatureSelector<StudioMembershipState>('StudioMembership');

const { selectAll } = membershipAdapter.getSelectors();

export const membershipRequestsSelector = createSelector(
  selectStudioMembershipFeature,
  (state: StudioMembershipState) => selectAll(state)
);

export const pendingMembershipRequestsSelector = createSelector(
  membershipRequestsSelector,
  (requests) => requests.filter((r) => r.status === MembershipStatus.PENDING)
);

export const membershipLoadingSelector = createSelector(
  selectStudioMembershipFeature,
  (state: StudioMembershipState) => state.isLoading
);

export const membershipErrorSelector = createSelector(
  selectStudioMembershipFeature,
  (state: StudioMembershipState) => state.error
);
