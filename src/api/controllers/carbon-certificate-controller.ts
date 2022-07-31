import { Controller, HttpStatus, Inject, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { Body, Get, Param, Patch } from '@nestjs/common/decorators/http';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CarbonCertificateService } from '../../domain/capabilities/carbon-certificates-service';
import { CertificateDoesNotBelongToUserError } from '../../domain/exceptions/certificate-does-not-belong-to-user';
import { CertificateNotFoundError } from '../../domain/exceptions/certificate-not-found';
import { UserNotFoundError } from '../../domain/exceptions/user-not-found';
import { CarbonCertificateServiceImpl } from '../../domain/services/carbon-certificates';
import { UserType } from '../../domain/types/user';
import { User } from '../decorators/user';
import { ApiErrorFilter } from '../exceptions/filters/api-error-filter';
import { ErrorStatus } from '../exceptions/transform/error-status';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { ApiValidationPipe } from '../pipes/api-validation-pipe';
import { CarbonCertificateItemResource } from '../resources/certificate/certificate-item';
import { CertificateItemsResource } from '../resources/certificate/certificate-items';
import { CertificateIdParam } from '../validators/certificate/certificate-id-param';
import { CertificateUpdateBody } from '../validators/certificate/update-body';

@ApiTags('Carbon Certificates')
@Controller()
@UsePipes(ApiValidationPipe)
@UseFilters(ApiErrorFilter)
export class CarbonCertificateController {
  constructor(@Inject(CarbonCertificateServiceImpl) private certificates: CarbonCertificateService) {}

  @ApiOperation({
    summary: 'List carbon certificates for a logged in user',
    description: 'Returns carbon certificate information',
  })
  @ApiResponse({ status: HttpStatus.OK, type: CertificateItemsResource })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/v1/certificates/')
  async obtainManyForOwner(@User() user: UserType): Promise<CertificateItemsResource> {
    const certificates = await this.certificates.obtainManyByOwner(Number(user.id));

    return CertificateItemsResource.from(certificates);
  }

  @ApiOperation({
    summary: 'List carbon certificates that are not owned by anyone',
    description: 'Returns carbon certificate information',
  })
  @ApiResponse({ status: HttpStatus.OK, type: CertificateItemsResource })
  @Get('/v1/ownerless-certificates/')
  async obtainManyOwnerless(): Promise<CertificateItemsResource> {
    const certificates = await this.certificates.obtainManyOwnerless();

    return CertificateItemsResource.from(certificates);
  }

  @ApiOperation({
    summary: 'Transfer ownership of a carbon certificate to someone else',
    description: 'Returns updated carbon certificate information',
  })
  @ApiResponse({ status: HttpStatus.OK, type: CarbonCertificateItemResource })
  @ErrorStatus(CertificateNotFoundError, HttpStatus.NOT_FOUND)
  @ErrorStatus(UserNotFoundError, HttpStatus.NOT_FOUND)
  @ErrorStatus(CertificateDoesNotBelongToUserError, HttpStatus.FORBIDDEN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/v1/certificates/:certificateId')
  async updateOneOwnership(
    @Param() param: CertificateIdParam,
    @Body() body: CertificateUpdateBody,
    @User() user: UserType,
  ): Promise<CarbonCertificateItemResource> {
    const certificates = await this.certificates.updateOneOwnership({
      id: Number(param.certificateId),
      newOwner: body.newOwner,
      owner: user.id,
    });

    return CarbonCertificateItemResource.from(certificates);
  }
}
