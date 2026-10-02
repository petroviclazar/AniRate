import { UserRole } from './user-role.enum';

export interface User {
  id?: number;
  username?: string;
  password?: string;
  role?: UserRole;
  photo?: string;
  email?: string;
}
export class UserModel implements User {
  id?: number;
  username?: string;
  password?: string;
  role?: UserRole;
  photo?: string | undefined;
  email?: string;

  constructor(
    id?: number,
    username?: string,
    password?: string,
    email?: string,
    photo?: string,
    role?: UserRole
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.photo = photo;
    this.role = role;
  }
}
