import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  Put,
  Query,
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
  async getAllAnime(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.animeService.getAllAnime(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
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
