import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeStudio } from './animestudio.entity';
import { AnimeStudioController } from './animestudio.controller';
import { AnimeStudioService } from './animestudio.service';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { LoggedGuard } from 'src/guards/logged.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { StudioMembership } from '../studio-membership/studio-membership.entity';


@Module({
  imports: [
    // Registrujemo AnimeStudio I User repozitorijum direktno (a ne ceo
    // UserModule) da bismo izbegli kruznu zavisnost:
    // UserModule -> AnimeModule -> AnimeStudioModule -> UserModule.
    TypeOrmModule.forFeature([AnimeStudio, User]),
    // Tajna za potpisivanje JWT-a cita se iz .env (JWT_SECRET), nije u kodu.
    // registerAsync: fabrika se izvrsava tek kad je .env vec ucitan.
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3h' },
      }),
    }),
  ],
  controllers: [AnimeStudioController],
  providers: [AnimeStudioService, LoggedGuard, RolesGuard],
  exports: [AnimeStudioService],
})
export class AnimeStudioModule {}
