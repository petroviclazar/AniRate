import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AnimeKomentarService } from './animekomentar.service';
import { AnimeKomentar } from './animekomentar.entity';
import { LoggedGuard } from 'src/guards/logged.guard';

@Controller('komentar')
export class AnimeKomentarController {
  constructor(private readonly animekomentarService: AnimeKomentarService) {}

  @Post('addAnime')
  @UseGuards(LoggedGuard)
  async addAnime(
    @Body('animeKomentar') animeKomentar: string,
    @Body('animeId') animeId: number,
    @Body('userId') userId: number,
  ): Promise<AnimeKomentar> {
    return this.animekomentarService.createRating(
      userId,
      animeId,
      animeKomentar,
    );
  }
  @Post('addKomentar/:animeId/:userId')
  @UseGuards(LoggedGuard)
  async addAnime5(
    @Param('animeId') animeId: number,
    @Param('userId') userId: number,
    @Body() body: { komentar: string }, // Preuzima ceo JSON objekat
  ): Promise<AnimeKomentar> {
    const { komentar } = body;
    console.log(body);
    return this.animekomentarService.createRating(userId, animeId, komentar);
  }
  @Get('getKomentar/:animeId')
  @UseGuards(LoggedGuard)
  async getKomentar(
    @Param('animeId') animeId: number,
  ): Promise<AnimeKomentar[]> {
    return this.animekomentarService.getKomentarZaAnime(animeId);
  }
  @Delete('deleteKomentar/:idKomentara')
  @UseGuards(LoggedGuard)
  async deleteKomentar(@Param('idKomentara') idKomentara: number) {
    console.log(idKomentara);
    await this.animekomentarService.deleteKomentar(idKomentara);
  }
}
