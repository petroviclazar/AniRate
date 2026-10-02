import { UserModel } from './user.module';
import { AnimeStudioModel } from './animestudio.module';
import { MembershipStatus } from './membership-status.enum';

export interface StudioMembership {
  id?: number;
  status?: MembershipStatus;
  createdAt?: string;
  user?: UserModel;
  studio?: AnimeStudioModel;
}

export class StudioMembershipModel implements StudioMembership {
  id?: number;
  status?: MembershipStatus;
  createdAt?: string;
  user?: UserModel;
  studio?: AnimeStudioModel;

  constructor(
    id?: number,
    status?: MembershipStatus,
    createdAt?: string,
    user?: UserModel,
    studio?: AnimeStudioModel
  ) {
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
    this.user = user;
    this.studio = studio;
  }
}
