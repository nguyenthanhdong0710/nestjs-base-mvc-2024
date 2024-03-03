import { Reflector } from '@nestjs/core';
import { EUserRole } from 'src/users/users.model';

export const Roles =
  Reflector.createDecorator<
    Array<EUserRole.SUPER_ADMIN | EUserRole.ADMIN | EUserRole.USER>
  >();
