import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Anime } from './anime.entity';
import { AnimeStudioService } from 'src/animestudio/animestudio.service';
import { NotFoundException } from '@nestjs/common';
import { AnimeRating } from 'src/animerating/animerating.entity';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(Anime)
    private readonly animeRepository: Repository<Anime>,
    @Inject(AnimeStudioService)
    private readonly animeStudioService: AnimeStudioService,
  ) {}

  async findAnimeByName(name: string): Promise<Anime | null> {
    return this.animeRepository.findOne({ where: { name } });
  }
  async findById(id: number): Promise<Anime | null> {
    return this.animeRepository.findOneById(id);
  }

  async addAnimeWithStudio(anime: Anime, studioId: number): Promise<Anime> {
    const studio = await this.animeStudioService.findOneById(studioId);
    if (!studio) {
      throw new NotFoundException(`Studio with ID ${studioId} not found`);
    }

    anime.studio = studio;
    return this.animeRepository.save(anime);
  }

  // Vraca samo jednu "stranicu" kataloga (skip/take na bazi), umesto da se
  // ceo katalog uvek povlaci - klijent je onda drzi samo ono sto je
  // korisnik zaista ucitao ("Ucitaj jos"), ne ceo katalog u NgRx store-u.
  async getAllAnime(
    page = 1,
    limit = 20,
  ): Promise<{ data: Anime[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.animeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }
  async getAnimeById(id: number): Promise<Anime | undefined> {
    return this.animeRepository.findOneById(id);
  }
  async updateAnimeRating1(anime: Anime): Promise<void> {
    await this.animeRepository.update(anime.id, { rating: anime.rating });
  }
  async getAnimeByStudio(studioId: number): Promise<Anime[]> {
    return this.animeRepository.find({
      where: {
        studio: Equal(studioId),
      },
    });
  }
  async save(anime: Anime): Promise<Anime> {
    try {
      return await this.animeRepository.save(anime);
    } catch (error) {
      throw new Error(`Greška prilikom čuvanja animea: ${error.message}`);
    }
  }
}
