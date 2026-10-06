import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['jwt'];
    if (!cookie) {
      return false;
    }
    try {
      const payload = await this.jwtService.verifyAsync(cookie);
      request.user = payload;
      return true;
    } catch (e) {
      return false;
    }
  }
}
