import { PrismaClient } from '@prisma/client';
import { env } from '../../shared/env';

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
});