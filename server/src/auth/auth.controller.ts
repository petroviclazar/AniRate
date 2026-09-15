import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  // Ova ruta demonstrira Passport.js autentifikaciju: AuthGuard('local')
  // interno poziva LocalStrategy.validate(), koja koristi
  // AuthService.validateUser() (bcrypt.compare protiv hesirane lozinke).
  // Ako je uspesno, Passport postavi provereni user objekat na
  // request.user, koji ovde koristimo da izdamo JWT (isti format
  // kolacica kao i postojeci /user/login endpoint).
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = req.user;
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);
    response.cookie('jwt', token, { httpOnly: true });

    const { password, ...result } = user;
    return result;
  }
}