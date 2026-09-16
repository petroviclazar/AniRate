import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AnimeModule } from 'src/anime/anime.module';
import { JwtModule } from '@nestjs/jwt';
import { LoggedGuard } from 'src/guards/logged.guard';

@Module({
  imports: [
    AnimeModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LoggedGuard],
  exports: [UserService],
})
export class UserModule {}
