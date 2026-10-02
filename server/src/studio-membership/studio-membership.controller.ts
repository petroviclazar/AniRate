import { Controller, Post, Get, Param, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { StudioMembershipService } from './studio-membership.service';
import { LoggedGuard } from '../guards/logged.guard';

@Controller('studio-membership')
export class StudioMembershipController {
  constructor(
    private readonly studioMembershipService: StudioMembershipService,
  ) {}

  // Bilo koji ulogovan korisnik moze da posalje zahtev za clanstvo.
  @Post(':studioId/request')
  @UseGuards(LoggedGuard)
  async requestMembership(
    @Param('studioId') studioId: number,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.sub;
    return this.studioMembershipService.requestMembership(studioId, userId);
  }

  // Ownership provera je unutar servisa (ne RolesGuard-om), jer nije
  // dovoljno da je korisnik STUDIO_OWNER uopste - mora biti vlasnik BAS
  // ovog studija.
  @Get(':studioId/requests')
  @UseGuards(LoggedGuard)
  async getRequests(
    @Param('studioId') studioId: number,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.sub;
    return this.studioMembershipService.getRequestsForStudio(
      studioId,
      userId,
    );
  }

  @Post('requests/:requestId/approve')
  @UseGuards(LoggedGuard)
  async approve(
    @Param('requestId') requestId: number,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.sub;
    return this.studioMembershipService.approveRequest(requestId, userId);
  }

  @Post('requests/:requestId/reject')
  @UseGuards(LoggedGuard)
  async reject(
    @Param('requestId') requestId: number,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.sub;
    return this.studioMembershipService.rejectRequest(requestId, userId);
  }
}
