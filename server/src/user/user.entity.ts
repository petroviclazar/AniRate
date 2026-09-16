import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Anime } from '../anime/anime.entity';
import { AnimeRating } from 'src/animerating/animerating.entity';
import { AnimeKomentar } from 'src/animekomentari/animekomentar.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  photo: string | null;

  @ManyToMany(() => Anime)
  @JoinTable()
  animeList: Anime[];

  @Column({ nullable: true })
  role: string | null;
  @OneToMany(() => AnimeRating, (rating) => rating.user)
  animeRatings: AnimeRating[];
  @OneToMany(() => AnimeKomentar, (komentar) => komentar.user)
  userKomentar: AnimeKomentar[];
}
export class LoginDto {
  username: string;
  password: string;
}
