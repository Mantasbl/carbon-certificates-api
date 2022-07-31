import { Controller, Get, HttpStatus, Inject, Query, UseFilters, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../../domain/capabilities/auth-service';
import { IncorrectLoginDetails } from '../../domain/exceptions/incorrect-login-details';
import { UserNotFoundError } from '../../domain/exceptions/user-not-found';
import { AuthServiceImpl } from '../../domain/services/auth';
import { JWT } from '../../domain/types/auth';
import { ApiErrorFilter } from '../exceptions/filters/api-error-filter';
import { ErrorStatus } from '../exceptions/transform/error-status';
import { ApiValidationPipe } from '../pipes/api-validation-pipe';
import { JwtResource } from '../resources/jwt';
import { AuthFilterQuery } from '../validators/auth/auth-filter-query';

@ApiTags('Auth')
@Controller()
@UsePipes(ApiValidationPipe)
@UseFilters(ApiErrorFilter)
export class AuthController {
  constructor(@Inject(AuthServiceImpl) private authService: AuthService) {}

  @ApiOperation({
    summary: 'Generate JWT token from username and password',
    description:
      'Returns access_token that, when decoded, contains username and password. Valid for 12hours default, unless otherwise changed by env',
  })
  @ApiResponse({ status: HttpStatus.OK, type: JwtResource })
  @ApiResponse({ status: HttpStatus.OK })
  @ErrorStatus(UserNotFoundError, HttpStatus.NOT_FOUND)
  @ErrorStatus(IncorrectLoginDetails, HttpStatus.NOT_FOUND)
  @Get('/v1/login')
  async generateAuthJWT(@Query() query: AuthFilterQuery): Promise<JWT> {
    const validatedUser = await this.authService.validateUser(query.username, query.password);
    const jwt = await this.authService.generateJwt({
      username: query.username,
      password: query.password,
      id: validatedUser,
    });
    return { access_token: jwt };
  }
}
