import { HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export type ApiErrorOptions = {
  status: HttpStatus;
  type: Type<Error> | Type<Error>[];
  description?: string;
  meta?: Type;
};

export const ApiError = (options: ApiErrorOptions): MethodDecorator & ClassDecorator => {
  const ErrorSchema = (
    httpStatus: HttpStatus,
    type: Type<Error>[],
    meta?: Type,
  ): SchemaObject & Partial<ReferenceObject> => {
    return {
      type: 'object',
      title: 'HttpErrorItem',
      description: 'HTTP Error Item',
      required: ['error'],
      discriminator: {
        propertyName: 'Wtg?',
      },
      properties: {
        error: {
          title: 'HttpError',
          description: 'Http Error contents.',
          required: ['name', 'message', 'status', 'faults'],
          properties: {
            name: {
              type: 'string',
              example: type[0].name,
              description: 'The name of an error.',
              enum: type.length > 1 ? type.map((item) => item.name) : undefined,
            },
            message: {
              type: 'string',
              example: 'Something went wrong',
              description: 'Error message.',
            },
            status: {
              type: 'number',
              example: httpStatus,
              description: 'HTTP status code.',
            },
            faults: {
              type: 'array',
              items: {
                type: 'string',
                example: 'cause of a failure',
                description: 'Other error related warnings and messages.',
              },
            },
          },
        },
        ...(meta && {
          meta: {
            $ref: `#/components/schemas/${meta.name}`,
          },
        }),
      },
    };
  };

  return (target: unknown, key?: unknown, descriptor?: unknown) => {
    if (options.meta) {
      ApiExtraModels(options.meta)(target as object, key as symbol, descriptor as TypedPropertyDescriptor<unknown>);
    }
    ApiResponse({
      status: options.status,
      schema: ErrorSchema(options.status, Array.isArray(options.type) ? options.type : [options.type], options.meta),
      description: options.description,
    })(target as object, key as symbol, descriptor as TypedPropertyDescriptor<unknown>);
  };
};
