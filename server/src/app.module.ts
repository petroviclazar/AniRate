import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AnimeModule } from './anime/anime.module';
import { ConfigModule } from '@nestjs/config';
import { AnimeStudio } from './animestudio/animestudio.entity';
import { AnimeStudioModule } from './animestudio/animestudio.module';
import { AnimeRatingModule } from './animerating/animerating.module';
import { AuthModule } from './auth/auth.module';
import { AnimeKomentarModule } from './animekomentari/animekomentar.module';
import { JwtModule } from '@nestjs/jwt';
import { LoggedGuard } from './guards/logged.guard';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '10h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AnimeStudioModule,
    AnimeModule,
    UserModule,
    AuthModule,
    AnimeRatingModule,
    AnimeKomentarModule,
    UploadModule,
  ],
  controllers: [],
  providers: [LoggedGuard],
})
export class AppModule {}