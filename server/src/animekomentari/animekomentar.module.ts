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
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '3h' },
    }),
  ], 
  providers: [AnimeKomentarService, LoggedGuard],
  controllers: [AnimeKomentarController],
  exports: [AnimeKomentarService],
})
export class AnimeKomentarModule {}
