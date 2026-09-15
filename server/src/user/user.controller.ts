import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  UnauthorizedException,
  Req,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { LoggedGuard } from 'src/guards/logged.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('addUser')
  async addUser(@Body() user: User): Promise<User> {
    return this.userService.addUser(user);
  }

  @Get('getUser')
  async getUser(): Promise<User[]> {
    return this.userService.getAllUser();
  }
  @Post('addAnimeToUser/:userId/:animeId')
  async addAnimeToUser(
    @Param('userId') userId: number,
    @Param('animeId') animeId: number,
  ): Promise<User> {
    return this.userService.addAnimeToUser(userId, animeId);
  }
  @Put('UpdateSliku/:userId')
  @UseGuards(LoggedGuard)
  async UpdateSliku(
    @Param('userId') userId: string,
    @Body('photo') photo: any, // Promenite tip na 'any'
  ): Promise<User> {
    console.log(userId);
    console.log(photo);

    console.log('--------------------');
    return this.userService.updateSliku(userId, photo);
  }

  @Get('getLoggedUser')
  async getLoggedUser(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const userr = await this.userService.getUserByUsername(
        data['username'],
      );
      const { password, ...result } = userr;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
  @Get('user/:userId')
  @UseGuards(LoggedGuard)
  async getUserAnime(@Param('userId') userId: number) {
    const user = await this.userService.findUserWithAnime(userId);
    return user.animeList;
  }
  @Get('getUserWithId/:userId')
  @UseGuards(LoggedGuard)
  async getUserWithId(@Param('userId') userId: number) {
    const user = await this.userService.findById(userId);
    return user;
  }
  @Get('getUserByUsername/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUser(username);
  }
}