import express, { Request, Response } from 'express';
import { logger } from '../../logger';
import { getMockTask } from '../../mocks';

export const taskRouter = express.Router();

taskRouter.get('/task', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.json(getMockTask());
});

taskRouter.get('/task/id', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.json(getMockTask());
});

taskRouter.get('/task/authored', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.json(getMockTask());
});

taskRouter.get('/task/assigned', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.json(getMockTask());
});

taskRouter.post('/task', (req: Request, res: Response) => {
  logger.info('POST request received');
  res.json(getMockTask(8));
});

taskRouter.put('/task/:id', (req: Request, res: Response) => {
  logger.info('PUT request received');
  res.json({ success: true });
});

taskRouter.delete('/task/:id', (req: Request, res: Response) => {
  logger.info('DELETE request received');
  res.json({ success: true });
});
