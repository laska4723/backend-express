import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  const isCustomException = 'code' in err;

  res
    .status(isCustomException ? err.code : 500)
    .json({ message: isCustomException ? err.message : 'Internal Server Error' });
};
