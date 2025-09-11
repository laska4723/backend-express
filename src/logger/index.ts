import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
  sync: true,
  translateTime: 'HH:MM:ss',
  ignore: 'pid,hostname',
});

export const logger = pino(stream);
