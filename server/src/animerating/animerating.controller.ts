import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AnimeRatingService } from './animerating.service';
import { AnimeRating } from './animerating.entity';
import { LoggedGuard } from 'src/guards/logged.guard';

@Controller('animerating')
export class AnimeRatingController {
  constructor(private readonly animeratingService: AnimeRatingService) {}

  @Post('addAnime')
  @UseGuards(LoggedGuard)
  async addAnime(
    @Body('animeRating') animeRating: number,
    @Body('animeId') animeId: number,
    @Body('userId') userId: number,
  ): Promise<AnimeRating> {
    return this.animeratingService.createRating(userId, animeId, animeRating);
  }
  @Post('addAnime5/:animeId/:userId')
  @UseGuards(LoggedGuard)
  async addAnime5(
    @Param('animeId') animeId: number,
    @Param('userId') userId: number,
    @Body() body: { rating: number },
  ): Promise<AnimeRating> {
    const { rating } = body;
    console.log(body);
    return this.animeratingService.createRating(userId, animeId, rating);
  }
}
