import express, { Request, Response } from 'express';
import { logger } from '../../logger';
import { getMockTask } from '../../mocks';
import { validate } from '../../validation';
import { CreateTaskDto, UpdateTaskDto } from './dto';

export const taskRouter = express.Router();

taskRouter.get('/', (req: Request, res: Response) => {
  logger.info('GET request received');

  res.json(getMockTask());
});

taskRouter.post('/', (req: Request, res: Response) => {
  logger.info('Создание задачи');

  const dto = validate(CreateTaskDto, req.body);

  console.log(req.body);

  res.json(getMockTask(8));
});

taskRouter.get('/:id', (req: Request, res: Response) => {
  logger.info('GET request received');

  res.json(getMockTask());
});

taskRouter.put('/:id', (req: Request, res: Response) => {
  logger.info('Изменение задачи');

  const dto = validate(UpdateTaskDto, req.body);

  console.log(req.body);

  res.json({ success: true });
});

taskRouter.delete('/:id', (req: Request, res: Response) => {
  logger.info('DELETE request received');

  res.json({ success: true });
});

taskRouter.get('/authored', (req: Request, res: Response) => {
  logger.info('GET request received');

  res.json(getMockTask());
});

taskRouter.get('/assigned', (req: Request, res: Response) => {
  logger.info('GET request received');

  res.json(getMockTask());
});
