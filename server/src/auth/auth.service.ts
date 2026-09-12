import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}
  async validateUser(username: string, password: string) {
    const userr = await this.userService.getUserByUsername(username);
    if (userr && (await bcrypt.compare(password, userr.password))) {
      return userr;
    }
    return null;
  }
}