import { FastifyAdapter } from '@nestjs/platform-fastify';
import qs from 'qs';

export const useFastifyAdapter = (): FastifyAdapter => {
  return new FastifyAdapter({
    querystringParser: qs.parse,
  });
};
