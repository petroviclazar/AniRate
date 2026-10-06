import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { AnimeStudio } from './animestudio.entity';
import { UserRole } from '../user/user-role.enum';
import { StudioMembership } from '../studio-membership/studio-membership.entity';

@Injectable()
export class AnimeStudioService {
  constructor(
    @InjectRepository(AnimeStudio)
    private readonly animeStudioRepository: Repository<AnimeStudio>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(StudioMembership)
    private readonly membershipRepository: Repository<StudioMembership>
  ) {}

  async getAllAnimeStudio(): Promise<AnimeStudio[]> {
    const studija = await this.animeStudioRepository.find();
    return studija.map((s) => this.sanitize(s));
  }
  async vratiAnimeStudio(id: number): Promise<AnimeStudio> {
    return this.animeStudioRepository.findOneById(id);
  }
  async findOneById(id: number): Promise<AnimeStudio | undefined> {
    return this.animeStudioRepository.findOneById(id);
  }
  async addAnimeStudio(animeStudio: AnimeStudio): Promise<AnimeStudio> {
    console.log(animeStudio);
    return this.animeStudioRepository.save(animeStudio);
  }
  async getAnimeStudio(id: number): Promise<AnimeStudio> {
    const studio = await this.animeStudioRepository.findOneById(id);
    return this.sanitize(studio);
  }

  // Samo admin sme da dodeli vlasnika studija (proveravano u kontroleru
  // preko RolesGuard-a). Dodela vlasnistva promovise korisnika u
  // STUDIO_OWNER ulogu - ALI samo ako je trenutno obican MEMBER. Admin koji
  // dobije vlasnistvo nad studijem ostaje admin (ne sme da izgubi svoju
  // ulogu samo zato sto poseduje studio), a isto tako ne diramo ulogu ako
  // je vec STUDIO_OWNER (npr. vlasnik dva studija).
  async assignOwner(studioId: number, userId: number) {
  const studio = await this.animeStudioRepository.findOneById(studioId);
  const user = await this.userRepository.findOneById(userId);

  const prethodniVlasnik = studio.owner;          // 1. zapamti starog vlasnika

  studio.owner = user;
  await this.animeStudioRepository.save(studio);

  await this.membershipRepository.delete({
    studio: {id:studioId},
    user: {id:userId},
  });

  if (user.role === UserRole.MEMBER) {
    user.role = UserRole.STUDIO_OWNER;
    await this.userRepository.save(user);
  }

  // 2. ako stari vlasnik više nema nijedan studio, vrati ga u member
  if (prethodniVlasnik && prethodniVlasnik.id !== user.id
      && prethodniVlasnik.role === UserRole.STUDIO_OWNER) {
    const brojStudija = await this.animeStudioRepository.count({
      where: { owner: { id: prethodniVlasnik.id } },
    });
    if (brojStudija === 0) {
      prethodniVlasnik.role = UserRole.MEMBER;
      await this.userRepository.save(prethodniVlasnik);
    }
  }

  return this.getAnimeStudio(studioId);
}

  // Ne vracamo hesiranu lozinku vlasnika studija klijentu.
  private sanitize(studio: AnimeStudio | null): AnimeStudio {
    if (studio?.owner) {
      const { password, ...ownerBezSifre } = studio.owner as any;
      studio.owner = ownerBezSifre;
    }
    return studio as AnimeStudio;
  }
}