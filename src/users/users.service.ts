import { Injectable } from '@nestjs/common';
import { EUserRole, User } from './users.model';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: '1',
        username: 'supperadmin',
        // Passw0rd!
        password:
          '$2b$12$s50omJrK/N3yCM6ynZYmNeen9WERDIVTncywePc75.Ul8.9PUk0LK',
        role: EUserRole.SUPER_ADMIN,
      },
      {
        userId: '2',
        username: 'admin',
        // Passw0rd!
        password:
          '$2b$12$s50omJrK/N3yCM6ynZYmNeen9WERDIVTncywePc75.Ul8.9PUk0LK',
        role: EUserRole.ADMIN,
      },
      {
        userId: '3',
        username: 'user',
        // Passw0rd!
        password:
          '$2b$12$s50omJrK/N3yCM6ynZYmNeen9WERDIVTncywePc75.Ul8.9PUk0LK',
        role: EUserRole.USER,
      },
    ];
  }

  async findOne(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }
}
