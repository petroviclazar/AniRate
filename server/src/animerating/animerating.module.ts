import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeRating } from './animerating.entity';
import { AnimeModule } from 'src/anime/anime.module';
import { UserModule } from 'src/user/user.module';
import { AnimeStudioModule } from 'src/animestudio/animestudio.module';
import { AnimeRatingService } from './animerating.service';
import { AnimeRatingController } from './animerating.controller';
import { JwtModule } from '@nestjs/jwt';
import { LoggedGuard } from 'src/guards/logged.guard';

@Module({
  imports: [
    AnimeModule,
    UserModule,
    TypeOrmModule.forFeature([AnimeRating]),
    // Tajna za potpisivanje JWT-a cita se iz .env (JWT_SECRET), nije u kodu.
    // registerAsync: fabrika se izvrsava tek kad je .env vec ucitan.
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3h' },
      }),
    }),
  ], // Dodajte AnimeStudioModule
  providers: [AnimeRatingService, LoggedGuard],
  controllers: [AnimeRatingController],
  exports: [AnimeRatingService],
})
export class AnimeRatingModule {}
