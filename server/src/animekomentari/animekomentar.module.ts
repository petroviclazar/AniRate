import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeKomentar } from './animekomentar.entity';
import { AnimeModule } from 'src/anime/anime.module';
import { UserModule } from 'src/user/user.module';
import { AnimeStudioModule } from 'src/animestudio/animestudio.module';
import { AnimeKomentarService } from './animekomentar.service';
import { AnimeKomentarController } from './animekomentar.controller';
import { LoggedGuard } from 'src/guards/logged.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AnimeModule,
    UserModule,
    TypeOrmModule.forFeature([AnimeKomentar]),
    // Tajna za potpisivanje JWT-a cita se iz .env (JWT_SECRET), nije u kodu.
    // registerAsync: fabrika se izvrsava tek kad je .env vec ucitan.
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3h' },
      }),
    }),
  ], 
  providers: [AnimeKomentarService, LoggedGuard],
  controllers: [AnimeKomentarController],
  exports: [AnimeKomentarService],
})
export class AnimeKomentarModule {}
