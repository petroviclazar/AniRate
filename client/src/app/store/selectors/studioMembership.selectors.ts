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

// Selectori "fabrike": primaju id studija, jer kolekcija moze da sadrzi
// zahteve iz vise studija (ako je korisnik obisao vise stranica).
export const pendingRequestsForStudioSelector = (studioId: number) =>
  createSelector(membershipRequestsSelector, (requests) =>
    requests.filter(
      (r) =>
        r.studio?.id === studioId && r.status === MembershipStatus.PENDING
    )
  );

export const membersForStudioSelector = (studioId: number) =>
  createSelector(membershipRequestsSelector, (requests) =>
    requests.filter(
      (r) =>
        r.studio?.id === studioId && r.status === MembershipStatus.APPROVED
    )
  );

export const membershipLoadingSelector = createSelector(
  selectStudioMembershipFeature,
  (state: StudioMembershipState) => state.isLoading
);

export const membershipErrorSelector = createSelector(
  selectStudioMembershipFeature,
  (state: StudioMembershipState) => state.error
);
