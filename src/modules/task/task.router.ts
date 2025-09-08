import express, { Request, Response } from 'express';
import { logger } from '../../logger';
import { getMockTask, getMockUser } from '../../mocks';

export const taskRouter = express.Router();

taskRouter.get('', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.json(getMockUser());
});

taskRouter.post('', (req: Request, res: Response) => {
  logger.info('POST request received');
  res.send(getMockTask(8));
});

taskRouter.put('', (req: Request, res: Response) => {
  logger.info('PUT request received');
  res.send('Hello World! PUT');
});

taskRouter.delete('', (req: Request, res: Response) => {
  logger.info('DELETE request received');
  res.send('Hello World! DELETE');
});
