import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Anime } from '../anime/anime.entity';
import { User } from '../user/user.entity';

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

  // eager: true - automatski se ucitava uz svaki find()/findOneById() poziv
  // nad AnimeStudio, bez potrebe da se svuda rucno navodi relations:['owner']
  @ManyToOne(() => User, { nullable: true, eager: true })
  owner: User | null;
}
