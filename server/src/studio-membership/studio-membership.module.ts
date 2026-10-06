import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudioMembership } from './studio-membership.entity';
import { StudioMembershipController } from './studio-membership.controller';
import { StudioMembershipService } from './studio-membership.service';
import { AnimeStudio } from '../animestudio/animestudio.entity';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { LoggedGuard } from '../guards/logged.guard';

@Module({
  imports: [
    // Isti princip kao u AnimeStudioModule: registrujemo repozitorijume
    // direktno umesto uvoza celih AnimeStudioModule/UserModule, da ne bismo
    // uveli jos jedan krug u vec postojeci lanac zavisnosti modula.
    TypeOrmModule.forFeature([StudioMembership, AnimeStudio, User]),
    // Tajna za potpisivanje JWT-a cita se iz .env (JWT_SECRET), nije u kodu.
    // registerAsync: fabrika se izvrsava tek kad je .env vec ucitan.
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3h' },
      }),
    }),
  ],
  controllers: [StudioMembershipController],
  providers: [StudioMembershipService, LoggedGuard],
})
export class StudioMembershipModule {}
