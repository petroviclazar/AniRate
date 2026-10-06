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

  // Autora komentara uzimamo iz JWT-a (req.user), a ne iz URL-a - inace bi
  // korisnik mogao da komentarise u tudje ime.
  @Post('addKomentar/:animeId')
  @UseGuards(LoggedGuard)
  async addKomentar(
    @Param('animeId') animeId: number,
    @Body() body: { komentar: string },
    @Req() req: Request,
  ): Promise<AnimeKomentar> {
    const userId = (req as any).user.sub;
    return this.animekomentarService.createRating(
      userId,
      animeId,
      body.komentar,
    );
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
