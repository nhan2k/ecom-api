import { logger } from '@/utils/logger';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Ioredis from 'ioredis';

const connectCache = () => {
  try {
    const redisStore = connectRedis(session);
    const redisClient = new Ioredis({
      password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
    });
  } catch (error) {
    logger.error(`${error.message}`);
  }
};

export { connectCache };
