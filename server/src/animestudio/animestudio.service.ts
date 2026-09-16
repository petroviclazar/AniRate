import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { AnimeService } from 'src/anime/anime.service';
import { AnimeStudio } from './animestudio.entity';
@Injectable()
export class AnimeStudioService {
  constructor(
    @InjectRepository(AnimeStudio)
    private readonly animeStudioRepository: Repository<AnimeStudio>, // private readonly animeService: AnimeService,
  ) {}

  async getAllAnimeStudio(): Promise<AnimeStudio[]> {
    console.log(this.animeStudioRepository.find());
    return await this.animeStudioRepository.find();
  }
  async vratiAnimeStudio(id: number): Promise<AnimeStudio> {
    return this.animeStudioRepository.findOneById(id);
  }
  async findOneById(id: number): Promise<AnimeStudio | undefined> {
    return this.animeStudioRepository.findOneById(id);
  }
  async addAnimeStudio(animeStudio: AnimeStudio): Promise<AnimeStudio> {
    console.log(animeStudio);
    return this.animeStudioRepository.save(animeStudio);
  }
  async getAnimeStudio(id: number): Promise<AnimeStudio> {
    return this.animeStudioRepository.findOneById(id);
  }
}
