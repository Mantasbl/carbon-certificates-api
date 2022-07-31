import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CONFIG, PassportJWTOptions } from '../../config';
import { JwtPayload } from '../../domain/types/auth';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtOptions = CONFIG.PASSPORT_JWT() as PassportJWTOptions;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
