import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { JwtStrategy } from '../../../api/auth/jwt.strategy';
import { CONFIG, PassportJWTOptions } from '../../../config';
import { AuthServiceImpl } from '../../../domain/services/auth';
import { factory } from '../../../framework/provider';
import { UserEntityManager } from '../../../infrastructure/persistence/repository/user';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [CONFIG.PASSPORT_JWT.KEY],
      useFactory: (options: PassportJWTOptions) => ({
        secret: options.secret,
        secretOrPrivateKey: options.secret,
        signOptions: { expiresIn: options.expiresIn },
      }),
    }),
  ],
  providers: [UserEntityManager, JwtService, factory(AuthServiceImpl, [JwtService, UserEntityManager]), JwtStrategy],
  exports: [AuthServiceImpl],
})
export class AuthModule {}
