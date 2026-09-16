import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Anime } from '../anime/anime.entity';

@Entity()
export class AnimeRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.animeRatings)
  user: User;

  @ManyToOne(() => Anime, (anime) => anime.ratings)
  anime: Anime;
}
