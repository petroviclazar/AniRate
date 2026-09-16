import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { Anime } from './anime.entity';
import { AnimeStudioModule } from 'src/animestudio/animestudio.module';
import { AnimeStudioService } from 'src/animestudio/animestudio.service';
import { AnimeRatingModule } from 'src/animerating/animerating.module';
import { JwtModule } from '@nestjs/jwt';
import { LoggedGuard } from 'src/guards/logged.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AnimeStudioModule,
    TypeOrmModule.forFeature([Anime]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [AnimeService],
  controllers: [AnimeController],
  exports: [AnimeService],
})
export class AnimeModule {}
