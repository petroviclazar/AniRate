import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudioMembership } from './studio-membership.entity';
import { MembershipStatus } from './membership-status.enum';
import { AnimeStudio } from '../animestudio/animestudio.entity';
import { User } from '../user/user.entity';
import { UserRole } from '../user/user-role.enum';

@Injectable()
export class StudioMembershipService {
  constructor(
    @InjectRepository(StudioMembership)
    private readonly membershipRepository: Repository<StudioMembership>,
    @InjectRepository(AnimeStudio)
    private readonly animeStudioRepository: Repository<AnimeStudio>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async requestMembership(
    studioId: number,
    userId: number,
  ): Promise<StudioMembership> {
    const studio = await this.animeStudioRepository.findOneById(studioId);
    if (!studio) {
      throw new NotFoundException(`Studio sa ID ${studioId} nije pronadjen`);
    }
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Korisnik nije pronadjen');
    }

    // Vlasnik studija ne moze da posalje zahtev za clanstvo u sopstvenom
    // studiju - vec je i vise od clana.
    if (studio.owner && studio.owner.id === userId) {
      throw new ConflictException(
        'Vec si vlasnik ovog studija, ne mozes da postanes i clan',
      );
    }

    // Korisnik ne moze da posalje drugi zahtev dok mu prethodni ceka na
    // odobrenje ili je vec odobren.
    const postojeci = await this.membershipRepository.findOne({
      where: {
        studio: { id: studioId },
        user: { id: userId },
      },
    });
    if (
      postojeci &&
      postojeci.status !== MembershipStatus.REJECTED
    ) {
      throw new ConflictException(
        'Vec postoji zahtev za clanstvo u ovom studiju',
      );
    }

    const membership = this.membershipRepository.create({
      studio,
      user,
      status: MembershipStatus.PENDING,
    });
    const sacuvan = await this.membershipRepository.save(membership);
    return this.sanitize(sacuvan);
  }

  // Provera vlasnistva je PO KONKRETNOM STUDIJU, ne samo po ulozi
  // STUDIO_OWNER - vlasnik studija A ne sme da odobrava zahteve za studio B.
  // Izuzetak je ADMIN: on sme da upravlja zahtevima za svaki studio.
  private async proveriDaJeVlasnik(
    studioId: number,
    requestingUserId: number,
    requestingUserRole: UserRole,
  ): Promise<AnimeStudio> {
    const studio = await this.animeStudioRepository.findOneById(studioId);
    if (!studio) {
      throw new NotFoundException(`Studio sa ID ${studioId} nije pronadjen`);
    }
    if (requestingUserRole === UserRole.ADMIN) {
      return studio;
    }
    if (!studio.owner || studio.owner.id !== requestingUserId) {
      throw new ForbiddenException(
        'Samo vlasnik studija ili admin moze da upravlja zahtevima za clanstvo',
      );
    }
    return studio;
  }

  async getRequestsForStudio(
    studioId: number,
    requestingUserId: number,
    requestingUserRole: UserRole,
  ): Promise<StudioMembership[]> {
    await this.proveriDaJeVlasnik(
      studioId,
      requestingUserId,
      requestingUserRole,
    );
    const zahtevi = await this.membershipRepository.find({
      where: { studio: { id: studioId } },
    });
    return zahtevi.map((z) => this.sanitize(z));
  }

  async approveRequest(
    requestId: number,
    requestingUserId: number,
    requestingUserRole: UserRole,
  ): Promise<StudioMembership> {
    const zahtev = await this.membershipRepository.findOneById(requestId);
    if (!zahtev) {
      throw new NotFoundException('Zahtev nije pronadjen');
    }
    await this.proveriDaJeVlasnik(
      zahtev.studio.id,
      requestingUserId,
      requestingUserRole,
    );
    zahtev.status = MembershipStatus.APPROVED;
    const sacuvan = await this.membershipRepository.save(zahtev);
    return this.sanitize(sacuvan);
  }

  async rejectRequest(
    requestId: number,
    requestingUserId: number,
    requestingUserRole: UserRole,
  ): Promise<StudioMembership> {
    const zahtev = await this.membershipRepository.findOneById(requestId);
    if (!zahtev) {
      throw new NotFoundException('Zahtev nije pronadjen');
    }
    await this.proveriDaJeVlasnik(
      zahtev.studio.id,
      requestingUserId,
      requestingUserRole,
    );
    zahtev.status = MembershipStatus.REJECTED;
    const sacuvan = await this.membershipRepository.save(zahtev);
    return this.sanitize(sacuvan);
  }

  // Lista clanova studija = svi ODOBRENI zahtevi za taj studio.
  // Javna je (vidi je svako), jer je spisak clanova deo prikaza studija.
  async getMembersForStudio(studioId: number): Promise<StudioMembership[]> {
    const studio = await this.animeStudioRepository.findOneById(studioId);
    if (!studio) {
      throw new NotFoundException(`Studio sa ID ${studioId} nije pronadjen`);
    }
    const clanovi = await this.membershipRepository.find({
      where: {
        studio: { id: studioId },
        status: MembershipStatus.APPROVED,
      },
    });
    return clanovi.map((c) => this.sanitize(c));
  }

  // Ne vracamo hesirane lozinke (ni podnosioca zahteva ni vlasnika studija)
  // klijentu.
  private sanitize(membership: StudioMembership): StudioMembership {
    if (membership.user) {
      const { password, ...userBezSifre } = membership.user as any;
      membership.user = userBezSifre;
    }
    if (membership.studio?.owner) {
      const { password, ...ownerBezSifre } = membership.studio.owner as any;
      membership.studio.owner = ownerBezSifre;
    }
    return membership;
  }
}