import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { AnimeStudio } from '../animestudio/animestudio.entity';
import { AnimeRating } from 'src/animerating/animerating.entity';
import { AnimeKomentar } from 'src/animekomentari/animekomentar.entity';
@Entity()
export class Anime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  rating: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  episodeCount: number;

  @ManyToOne(() => AnimeStudio, (animeStudio) => animeStudio.anime)
  studio: AnimeStudio;

  @OneToMany(() => AnimeRating, (rating) => rating.anime)
  ratings: AnimeRating[];

  @OneToMany(() => AnimeKomentar, (komentar) => komentar.anime)
  animeKomentar: AnimeKomentar[];
}
