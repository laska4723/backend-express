import express, { Request, Response } from 'express';
import { logger } from '../../logger';
import { getMockDepartment } from '../../mocks';

export const departmentRouter = express.Router();

departmentRouter.get('/department', (req: Request, res: Response) => {
  logger.info('GET request received');
  res.json(getMockDepartment());
});

departmentRouter.post('/department', (req: Request, res: Response) => {
  logger.info('POST request received');
  res.json(getMockDepartment());
});

departmentRouter.put('/department/:id', (req: Request, res: Response) => {
  logger.info('PUT request received');
  res.json({ success: true });
});

departmentRouter.delete('/department/:id', (req: Request, res: Response) => {
  logger.info('DELETE request received');
  res.json({ success: true });
});
