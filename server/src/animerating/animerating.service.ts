import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimeRating } from './animerating.entity';
import { UserService } from 'src/user/user.service';
import { AnimeService } from 'src/anime/anime.service';
@Injectable()
export class AnimeRatingService {
  constructor(
    @InjectRepository(AnimeRating)
    private readonly animeRatingRepository: Repository<AnimeRating>,
    private readonly userService: UserService,
    private readonly animeService: AnimeService,
  ) {}

  async createRating(
    userId: number,
    animeId: number,
    animeRating: number,
  ): Promise<AnimeRating> {
    let existingRating = await this.animeRatingRepository.findOne({
      where: {
        user: { id: userId },
        anime: { id: animeId },
      },
    });

    if (existingRating) {
      existingRating.rating = animeRating;
      const updatedRating = await this.animeRatingRepository.save(
        existingRating,
      );
      console.log(22222222222222222);

      await this.updateAnimeRating(animeId);
      console.log(22222222222222222);

      return updatedRating;
    }

    const newRating = new AnimeRating();
    newRating.rating = animeRating;
    newRating.user = await this.userService.findById(userId);
    newRating.anime = await this.animeService.findById(animeId);

    const savedRating = await this.animeRatingRepository.save(newRating);
    console.log(22222222222222222);

    console.log(animeId);
    console.log(22222222222222222);

    await this.updateAnimeRating(animeId);

    return savedRating;
  }
  async updateAnimeRating(animeId: number): Promise<void> {
    const allRatingsForAnime = await this.animeRatingRepository.find({
      where: { anime: { id: animeId } },
    });

    const totalRatings = allRatingsForAnime.length;

    let totalRatingSum = 0;
    for (const r of allRatingsForAnime) {
      totalRatingSum += r.rating;
    }

    const newRating = totalRatings === 0 ? 0 : totalRatingSum / totalRatings;

    const anime = await this.animeService.findById(animeId);
    anime.rating = newRating;
    await this.animeService.save(anime);
  }
}
