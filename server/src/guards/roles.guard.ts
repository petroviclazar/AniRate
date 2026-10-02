import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from '../user/user-role.enum';

// VAZNO: RolesGuard se mora koristiti POSLE LoggedGuard u nizu guard-ova
// (@UseGuards(LoggedGuard, RolesGuard)), jer se oslanja na to da je
// LoggedGuard vec postavio request.user (iz JWT payload-a: { sub, username, role }).
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Nemate dozvolu za ovu akciju');
    }
    return true;
  }
}
