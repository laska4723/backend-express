import { config as readEnv } from 'dotenv';
import { validate } from '../validation';
import { AppConfigDto } from './app-config.dto';

readEnv();

const rawConfig = {
  port: process.env.PORT,
};

export const appConfig = validate(AppConfigDto, rawConfig);
