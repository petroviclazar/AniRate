import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Anime } from '../anime/anime.entity';

@Entity()
export class AnimeStudio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slika: string;

  @OneToMany(() => Anime, (anime) => anime.studio)
  anime: Anime[];
}
