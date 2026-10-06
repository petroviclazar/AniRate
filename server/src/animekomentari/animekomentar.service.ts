import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimeKomentar } from './animekomentar.entity';
import { UserService } from 'src/user/user.service';
import { AnimeService } from 'src/anime/anime.service';
import { UserRole } from 'src/user/user-role.enum';
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


    const animerating = new AnimeKomentar();
    animerating.komentar = animeRating;
    animerating.user = await this.userService.findById(userId);
    animerating.anime = await this.animeService.findById(animeId);

    const savedRating = await this.animeKomentarRepository.save(animerating);

    const allRatingsForAnime = await this.animeKomentarRepository.find({
      where: { anime: { id: animeId } },
    });
    return savedRating;
  }
  async getKomentarZaAnime(animeId: number): Promise<AnimeKomentar[]> {
    return await this.animeKomentarRepository
      .createQueryBuilder('comment')
      .where('comment.animeId = :animeId', { animeId })
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();
  }
  // Komentar sme da obrise samo njegov autor ili admin.
  async deleteKomentar(
    idKomentara: number,
    userId: number,
    role: UserRole,
  ): Promise<void> {
    // Ucitavamo komentar ZAJEDNO sa autorom (relacija user nije eager),
    // da bismo mogli da proverimo ko ga je napisao.
    const komentar = await this.animeKomentarRepository.findOne({
      where: { id: idKomentara },
      relations: ['user'],
    });

    if (!komentar) {
      throw new NotFoundException(
        `Komentar sa ID-om ${idKomentara} nije pronađen`,
      );
    }

    const jeAdmin = role === UserRole.ADMIN;
    const jeAutor = komentar.user?.id === userId;
    if (!jeAdmin && !jeAutor) {
      throw new ForbiddenException(
        'Samo autor komentara ili admin moze da obrise komentar',
      );
    }

    await this.animeKomentarRepository.remove(komentar);
  }
}
