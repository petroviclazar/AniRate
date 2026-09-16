export interface User {
  id?: number;
  username?: string;
  password?: string;
  role?: string;
  photo?: string;
  email?: string;
}
export class UserModel implements User {
  id?: number;
  username?: string;
  password?: string;
  role?: string;
  photo?: string | undefined;
  email?: string;

  constructor(
    id?: number,
    username?: string,
    password?: string,
    email?: string,
    photo?: string
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.photo = photo;
  }
}
