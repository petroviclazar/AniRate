import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AnimeStudioService } from './animestudio.service';
import { AnimeStudio } from './animestudio.entity';

@Controller('animestudio')
export class AnimeStudioController {
  constructor(private readonly AnimeStudioService: AnimeStudioService) {}

  @Post('addAnimeStudio')
  async addAnimeStudio(@Body() anime: AnimeStudio): Promise<AnimeStudio> {
    return this.AnimeStudioService.addAnimeStudio(anime);
  }

  @Get('getAnimeStudio')
  async getAnimeStudio(): Promise<AnimeStudio[]> {
    return this.AnimeStudioService.getAllAnimeStudio();
  }
  @Get('getAnimeStudio/:id')
  getAnimeStudio1(@Param('id') id: number) {
    console.log(id);
    return this.AnimeStudioService.getAnimeStudio(id);
  }
}
