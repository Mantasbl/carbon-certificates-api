import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { AuthOptions, CONFIG, PassportJWTOptions } from '../../config';
import { AuthService } from '../capabilities/auth-service';
import { UserRepository } from '../capabilities/user-repository';
import { IncorrectLoginDetails } from '../exceptions/incorrect-login-details';
import { JwtPayload } from '../types/auth';

export class AuthServiceImpl implements AuthService {
  constructor(private jwtService: JwtService, private users: UserRepository) {}

  async generateJwt(payload: JwtPayload): Promise<string> {
    const jwtOptions = CONFIG.PASSPORT_JWT() as PassportJWTOptions;
    return this.jwtService.sign(payload, jwtOptions);
  }

  async validateUser(username: string, password: string): Promise<number> {
    const authOptions = CONFIG.AUTH() as AuthOptions;
    const user = await this.users.obtainUserByUsername(username);
    const passwordHash = crypto
      .createHash('sha256')
      .update(password + authOptions.salt)
      .digest('base64');
    if (user.password !== passwordHash) {
      throw new IncorrectLoginDetails();
    }
    return user.id;
  }
}
