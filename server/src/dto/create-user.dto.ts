import { UserRole } from '../user/user-role.enum';

export class CreateUserDto {
  username: string;
  password: string;
  role?: UserRole;
}
