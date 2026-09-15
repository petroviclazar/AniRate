import {
  Injectable,
  Inject,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { AnimeService } from 'src/anime/anime.service';
import { NotFoundException } from '@nestjs/common';
import { AnimeRating } from 'src/animerating/animerating.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // private readonly animeService: AnimeService,
    @Inject(AnimeService)
    private readonly animeService: AnimeService,
  ) {}

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOneById(id);
  }
  async addUser(user: User): Promise<User | null> {
    const existingUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (existingUser) {
      console.log(
        `Korisnik sa korisničkim imenom ${user.username} već postoji.`,
      );
      return null; // Vraćamo null kako bismo označili da nije dodan novi korisnik
    }

    console.log(user);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  async addAnimeToUser(userId: number, animeId: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.animeList', 'anime')
      .where('user.id = :userId', { userId })
      .getOneOrFail();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const anime = await this.animeService.getAnimeById(animeId);

    if (!anime) {
      throw new NotFoundException('Anime not found');
    }

    if (!user.animeList) {
      user.animeList = [];
    }

    const alreadyExists = user.animeList.some(
      (existingAnime) => existingAnime.id === animeId,
    );
    if (alreadyExists) {
      throw new ConflictException('User already has this anime');
    }

    user.animeList.push(anime);
    await this.userRepository.save(user);

    return user;
  }
  async updateSliku(userId: string, photo: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(user.photo);
    console.log(photo);
    user.photo = photo;

    await this.userRepository.save(user);

    return user;
  }
  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    return user;
  }
  async findUserWithAnime(userId: number) {
    console.log(userId);
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['animeList'],
    });
    return user;
  }
  async getUserByUser(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new NotFoundException(
        `Korisnik sa korisničkim imenom ${username} nije pronađen`,
      );
    }
    return user;
  }
}