import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Anime } from '../anime/anime.entity';

@Entity()
export class AnimeKomentar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  komentar: string;

  @ManyToOne(() => User, (user) => user.userKomentar)
  user: User;

  @ManyToOne(() => Anime, (anime) => anime.animeKomentar)
  anime: Anime;
}
