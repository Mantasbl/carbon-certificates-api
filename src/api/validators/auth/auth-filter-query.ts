import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthFilterQuery {
  @ApiProperty({ type: String, example: 'JohnDoe' })
  @IsString()
  readonly username: string;

  @ApiProperty({ type: String, example: 'NotAPassword' })
  @IsString()
  readonly password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
