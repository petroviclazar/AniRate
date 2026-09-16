import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeStudio } from './animestudio.entity';
import { AnimeStudioController } from './animestudio.controller';
import { AnimeStudioService } from './animestudio.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LoggedGuard } from 'src/guards/logged.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnimeStudio]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AnimeStudioController],
  providers: [AnimeStudioService],
  exports: [AnimeStudioService],
})
export class AnimeStudioModule {}
