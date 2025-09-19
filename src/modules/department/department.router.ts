import express, { Request, Response } from 'express';
import { logger } from '../../logger';
import { getMockDepartment } from '../../mocks';
import { validate } from '../../validation';
import { CreateDepartmentBodyDto } from './dto';

export const departmentRouter = express.Router();

departmentRouter.get('/', (req: Request, res: Response) => {
  logger.info('GET request received');

  res.json(getMockDepartment());
});

departmentRouter.post('/', (req: Request, res: Response) => {
  logger.info('Создание департамента');

  const dto = validate(CreateDepartmentBodyDto, req.body);

  console.log(req.body);

  res.json(getMockDepartment());
});

departmentRouter.put('/:id', (req: Request, res: Response) => {
  logger.info('PUT request received');

  res.json({ success: true });
});

departmentRouter.delete('/:id', (req: Request, res: Response) => {
  logger.info('DELETE request received');

  res.json({ success: true });
});
