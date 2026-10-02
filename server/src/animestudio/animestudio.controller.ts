import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AnimeStudioService } from './animestudio.service';
import { AnimeStudio } from './animestudio.entity';
import { LoggedGuard } from 'src/guards/logged.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserRole } from 'src/user/user-role.enum';

@Controller('animestudio')
export class AnimeStudioController {
  constructor(private readonly AnimeStudioService: AnimeStudioService) {}

  // Samo admin sme da kreira nove anime studije - studija se ne prave
  // samostalno od strane obicnih korisnika.
  @Post('addAnimeStudio')
  @UseGuards(LoggedGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
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

  // Samo admin sme da dodeli vlasnika studija.
  @Post(':id/assignOwner/:userId')
  @UseGuards(LoggedGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async assignOwner(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ): Promise<AnimeStudio> {
    return this.AnimeStudioService.assignOwner(id, userId);
  }
}
