export class User {
  userId: string;
  username: string;
  password: string;
  role: EUserRole;
}

export enum EUserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}
