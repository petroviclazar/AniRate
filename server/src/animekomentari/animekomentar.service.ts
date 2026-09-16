import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimeKomentar } from './animekomentar.entity';
import { UserService } from 'src/user/user.service';
import { AnimeService } from 'src/anime/anime.service';
@Injectable()
export class AnimeKomentarService {
  constructor(
    @InjectRepository(AnimeKomentar)
    private readonly animeKomentarRepository: Repository<AnimeKomentar>,
    private readonly userService: UserService,
    private readonly animeService: AnimeService,
  ) {}

  async createRating(
    userId: number,
    animeId: number,
    animeRating: string,
  ): Promise<AnimeKomentar> {
    console.log(1111111111111111111111111111);

    console.log(animeRating);
    console.log(222222222222222222222222222222);

    const animerating = new AnimeKomentar();
    animerating.komentar = animeRating;
    console.log(userId);
    animerating.user = await this.userService.findById(userId);
    animerating.anime = await this.animeService.findById(animeId);
    console.log(animeRating);

    const savedRating = await this.animeKomentarRepository.save(animerating);

    const allRatingsForAnime = await this.animeKomentarRepository.find({
      where: { anime: { id: animeId } },
    });
    return savedRating;
  }
  async getKomentarZaAnime(animeId: number): Promise<AnimeKomentar[]> {
    console.log(animeId);
    return await this.animeKomentarRepository
      .createQueryBuilder('comment')
      .where('comment.animeId = :animeId', { animeId })
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();
  }
  async deleteKomentar(idKomentara: number): Promise<void> {
    const komentar = await this.animeKomentarRepository.findOneById(
      idKomentara,
    );

    if (!komentar) {
      throw new NotFoundException(
        `Komentar sa ID-om ${idKomentara} nije pronađen`,
      );
    }

    await this.animeKomentarRepository.remove(komentar);
  }
}
