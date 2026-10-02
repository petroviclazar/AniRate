import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/user-role.enum';

export const ROLES_KEY = 'roles';

// Koristi se zajedno sa RolesGuard, npr:
// @UseGuards(LoggedGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
