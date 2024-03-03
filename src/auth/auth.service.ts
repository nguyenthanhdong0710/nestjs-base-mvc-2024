import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(username);
    if (user && (await compare(pass, user.password))) {
      const userClone = { ...user };
      delete userClone.password;
      return userClone;
    }
    return null;
  }
}
