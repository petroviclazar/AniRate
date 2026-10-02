import { EntityState } from '@ngrx/entity';
import { StudioMembershipModel } from './studio-membership.module';

export interface StudioMembershipState extends EntityState<StudioMembershipModel> {
  isLoading: boolean;
  error: string | null;
}
