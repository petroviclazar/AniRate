import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AnimeRatingService } from './animerating.service';
import { AnimeRating } from './animerating.entity';
import { LoggedGuard } from 'src/guards/logged.guard';

@Controller('animerating')
export class AnimeRatingController {
  constructor(private readonly animeratingService: AnimeRatingService) {}

  // Ko ocenjuje uzimamo iz JWT-a (req.user, upisao ga LoggedGuard), a ne iz
  // URL-a - inace bi korisnik mogao da oceni u tudje ime.
  @Post('addAnime5/:animeId')
  @UseGuards(LoggedGuard)
  async addAnime5(
    @Param('animeId') animeId: number,
    @Body() body: { rating: number },
    @Req() req: Request,
  ): Promise<AnimeRating> {
    const userId = (req as any).user.sub;
    return this.animeratingService.createRating(userId, animeId, body.rating);
  }
}
