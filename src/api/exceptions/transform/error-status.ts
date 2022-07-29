import { CallHandler, ExecutionContext, UseInterceptors } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { catchError, Observable, throwError } from 'rxjs';

import { ApiErrorFilter } from '../filters/api-error-filter';

export function ErrorStatus(From: Type<Error> | Type<Error>[], statusCode: ErrorHttpStatusCode): MethodDecorator {
  return UseInterceptors({
    intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
      return next.handle().pipe(
        catchError((error) => {
          (Array.isArray(From) ? From : [From]).forEach((item) => {
            if (error instanceof item) {
              Reflect.defineMetadata(ApiErrorFilter.STATUS_CODE_META_DATA, statusCode, item);
            }
          });

          return throwError(() => error);
        }),
      );
    },
  });
}
