import { config as readEnv } from 'dotenv';
import { validate } from '../validation';
import { AppConfigDto } from './app-config.dto';

readEnv();

const rawAppConfig = {
  port: process.env.PORT,
  pgPort: process.env.PG_PORT,
  pgHost: process.env.PG_HOST,
  pgUsername: process.env.PG_USERNAME,
  pgPassword: process.env.PG_PASSWORD,
  pgDatabase: process.env.PG_DATABASE,
};

export const appConfig = validate(AppConfigDto, rawAppConfig);
