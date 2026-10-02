import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggedGuard implements CanActivate {
  // Napomena: ranije je ovaj guard u konstruktoru primao i UserService,
  // iako ga nigde u telu nije koristio - to je bila mrtva zavisnost koja
  // je samo pravila rizik od kruzne zavisnosti izmedju modula (npr. kada bi
  // AnimeStudioModule hteo da koristi ovaj guard, a UserModule uvozi
  // AnimeModule koji uvozi AnimeStudioModule). Za samu proveru JWT
  // kolacica potreban je samo JwtService.
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
