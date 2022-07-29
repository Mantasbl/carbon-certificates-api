import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../../domain/models/user';

export class UserResource {
  @ApiProperty({ type: String, example: 'Username' })
  readonly username: string;

  constructor(username: string) {
    this.username = username;
  }

  static from(user: User): UserResource {
    return new UserResource(user.username);
  }
}
