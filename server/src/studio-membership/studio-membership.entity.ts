import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { AnimeStudio } from '../animestudio/animestudio.entity';
import { MembershipStatus } from './membership-status.enum';

@Entity()
export class StudioMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => AnimeStudio, { eager: true })
  studio: AnimeStudio;

  @Column({
    type: 'enum',
    enum: MembershipStatus,
    default: MembershipStatus.PENDING,
  })
  status: MembershipStatus;

  @CreateDateColumn()
  createdAt: Date;
}
