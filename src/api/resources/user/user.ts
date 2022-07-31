import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../../domain/models/user';

export class UserResource {
  @ApiProperty({ type: Number, example: 1 })
  readonly id: number;

  @ApiProperty({ type: String, example: 'Username' })
  readonly username: string;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }

  static from(user: User): UserResource {
    return new UserResource(user.id, user.username);
  }
}
