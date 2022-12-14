import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  SECRET_KEY,
  SESSION_SECRET,
  SESSION_MAX_AGE,
  ISSUER,
  AUDIENCE,
  REDIS_PASS,
  SALT,
  ACCESS_EXPIRESIN,
  REFRESH_EXPIRESIN,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_DB,
  REDIS_USERNAME,
  TOKEN_BOT,
  CHAT_ID,
  URL_NETLIFY,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
} = process.env;
