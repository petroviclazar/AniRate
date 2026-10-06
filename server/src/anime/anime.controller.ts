import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  Put,
  Query,
  UseGuards,
  Req
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { Anime } from './anime.entity';
import { LoggedGuard } from 'src/guards/logged.guard';
import { Request } from 'express';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Post('addAnime/:studioId')
  @UseGuards(LoggedGuard)
  async addAnime(
    @Body() anime: Anime,
    @Param('studioId') studioId: number,
    @Req() req:Request
  ): Promise<Anime> {
    const userId=(req as any).user.sub;
    const role=(req as any).user.role;
    return this.animeService.addAnimeWithStudio(anime, studioId,userId,role);
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
