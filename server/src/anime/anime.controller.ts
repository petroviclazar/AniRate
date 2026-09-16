import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { Anime } from './anime.entity';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post('addAnime/:studioId')
  async addAnime(
    @Body() anime: Anime,
    @Param('studioId') studioId: number,
  ): Promise<Anime> {
    return this.animeService.addAnimeWithStudio(anime, studioId);
  }

  @Get('getAnime')
  async getAllAnime(): Promise<Anime[]> {
    return this.animeService.getAllAnime();
  }
  @Get('getAnimeByStudio/:id')
  getAnimeByStudio(@Param('id') id: number) {
    return this.animeService.getAnimeByStudio(id);
  }
  @Get('getAnimeById/:id')
  getAnimeById(@Param('id') id: number) {
    return this.animeService.getAnimeById(id);
  }
  @Put('updateAnime')
  async updateAnime(@Body() anime: Anime): Promise<Anime> {
    await this.animeService.updateAnimeRating1(anime);
    return anime;
  }
}
