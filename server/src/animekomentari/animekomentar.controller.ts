import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
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
  async deleteKomentar(
    @Param('idKomentara') idKomentara: number,
    @Req() req: Request,
  ) {
    // Ko brise i koja mu je uloga - iz JWT-a (LoggedGuard ga je upisao u req.user),
    // a ne od klijenta, da niko ne bi mogao da se predstavi kao neko drugi.
    const userId = (req as any).user.sub;
    const role = (req as any).user.role;
    await this.animekomentarService.deleteKomentar(idKomentara, userId, role);
  }
}
